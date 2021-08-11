import { Knex } from "knex"
import { AppContext } from "../modules"
import { Title, TitlesPage, QueryTitlesArgs, UpdateTitleInput } from "../types"
import { fetchPublisher } from "./publishers"
import logger from "../log"

import { URL } from "url"

const titleQueryBuilder = (db: Knex) =>
  db("titles").select("titles.*").orderBy("name", "asc")

export const listTitles = async (
  args: QueryTitlesArgs,
  context: AppContext
): Promise<TitlesPage> => {
  const titleQuery = titleQueryBuilder(context.database.db).modify(
    (queryBuilder) => {
      if (args.publisherId) {
        queryBuilder.where("publisher_id", args.publisherId.toString())
      }
    }
  )

  const { result, startCursor, endCursor, hasNextPage } =
    await context.database.paginateQuery<Title>(titleQuery, args)

  const totalCount = await context.database.countTable("titles")

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
  return await titleQueryBuilder(context.database.db).where("id", id).first()
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

  return await titleQueryBuilder(context.database.db)
    .update(titleInput)
    .where("id", id)
    .then((rows) => {
      if (!rows) {
        throw new Error(`Invalid title '${id}': Title not found`)
      }
      return fetchTitle(id, context)
    })
}
