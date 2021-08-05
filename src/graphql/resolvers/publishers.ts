import { Knex } from "knex"
import { AppContext } from "../modules/context"
import {
  Publisher,
  PublishersPage,
  QueryPublishersArgs,
} from "../types/schemas"

const publisherQueryBuilder = (db: Knex) =>
  db("publishers").select("publishers.*").orderBy("name", "asc")

export const listPublishers = async (
  args: QueryPublishersArgs,
  context: AppContext
): Promise<PublishersPage> => {
  const publishersQuery = publisherQueryBuilder(context.database.db)

  const { result, startCursor, endCursor, hasNextPage } =
    await context.database.paginateQuery<Publisher>(publishersQuery, args)

  const totalCount = await context.database.countTable("publishers")

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

export const fetchPublisher = async (
  id: number,
  context: AppContext
): Promise<Publisher> => {
  return await publisherQueryBuilder(context.database.db)
    .where("id", id)
    .first()
}
