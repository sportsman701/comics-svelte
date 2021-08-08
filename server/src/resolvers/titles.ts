import { Knex } from "knex"
import { AppContext } from "../modules"
import { Title, TitlesPage, QueryTitlesArgs } from "../types"

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
