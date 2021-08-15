import type { Knex } from "knex"
import { AppContext } from "../modules"
import { Title, TitlesPage, QueryTitlesArgs, UpdateTitleInput } from "../types"
import { fetchPublisher } from "./publishers"
import logger from "../log"

import { URL } from "url"

const titleQueryBuilder = (db: Knex) =>
  db("titles").select("titles.*").orderBy("name", "asc")

const issueCountQueryBuilder = (db: Knex) =>
  db("comics")
    .select("title_id")
    .count("id as _cnt")
    .groupBy("title_id")
    .as("cq")

const decorateQueryWithIssueCount = (db: Knex): Knex.QueryBuilder =>
  titleQueryBuilder(db)
    .select("cq._cnt as issue_count")
    .leftOuterJoin(issueCountQueryBuilder(db), "cq.title_id", "titles.id")

export const listTitles = async (
  args: QueryTitlesArgs,
  context: AppContext
): Promise<TitlesPage> => {
  const filterFn = (q: Knex.QueryBuilder): void => {
    if (args.publisherId) {
      q.where("publisher_id", args.publisherId.toString)
    }
  }

  const titleQuery = decorateQueryWithIssueCount(context.database.db).modify(
    filterFn
  )

  const { result, startCursor, endCursor, hasNextPage } =
    await context.database.paginateQuery<Title>(titleQuery, args, "name")

  const totalCount = await context.database.countTable("titles", filterFn)

  return {
    totalCount: totalCount,
    items: result,
    pageInfo: {
      startCursor: startCursor,
      endCursor: endCursor,
      hasNextPage: hasNextPage,
    },
  }
}

export const fetchTitle = async (
  id: number,
  context: AppContext
): Promise<Title> => {
  return await decorateQueryWithIssueCount(context.database.db)
    .where("id", id)
    .first()
}

export const updateTitle = async (
  id: number,
  titleInput: UpdateTitleInput,
  context: AppContext
): Promise<Title> => {
  const errors = []

  if (titleInput.name) {
    let nameValue = titleInput.name.trim()
    if (!nameValue.length) {
      errors.push(
        `Invalid 'name' input '${titleInput.name}': name must not be empty`
      )
    }

    if (nameValue.length > 255) {
      // todo: proper unicode (multi-byte) length checking
      errors.push(
        `Invalid 'name' input '${titleInput.name}': name must be 255 characters or less`
      )
    }
  }

  if (titleInput.publisher_id) {
    const publisher = await fetchPublisher(titleInput.publisher_id, context)
    if (!publisher) {
      errors.push(
        `Invalid 'publisher_id' input '${titleInput.publisher_id}': Publisher not found`
      )
    }
  }

  if (titleInput.url) {
    try {
      const _ = new URL(titleInput.url)
    } catch (e) {
      if (typeof e !== typeof TypeError) {
        logger.error(e)
      }
      errors.push(`Invalid 'url' input '${titleInput.url}'`)
    }
  }

  if (titleInput.volume) {
    if (titleInput.volume < 0) {
      errors.push(
        `Invalid 'volume' input '${titleInput.volume}': volume must not be negative`
      )
    }
  }

  if (titleInput.year) {
    if (titleInput.year.toString().length !== 4) {
      errors.push(
        `Invalid 'year' input '${titleInput.year}': year must be 4 digits`
      )
    }
  }

  if (errors.length) {
    throw new Error(`Validation Error: \n ${errors.join(", \n ")}`)
  }

  const update = {
    ...titleInput,
    date_updated: Math.round(new Date().getTime() / 1000),
  }

  return await titleQueryBuilder(context.database.db)
    .update(update)
    .where("id", id)
    .then((rows) => {
      if (!rows) {
        throw new Error(`Invalid title '${id}': Title not found`)
      }
      return fetchTitle(id, context)
    })
}
