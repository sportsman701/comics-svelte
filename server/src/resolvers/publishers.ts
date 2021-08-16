import { Knex } from "knex"
import { AppContext } from "../modules"
import { Publisher, PublishersPage, QueryPublishersArgs } from "../types"

const publisherQueryBuilder = (db: Knex) =>
  db("publishers").select("publishers.*").orderBy("name", "asc")

const titleCountQueryBuilder = (db: Knex): Knex.QueryBuilder =>
  db("titles")
    .select("publisher_id")
    .count("id as _cnt")
    .groupBy("publisher_id")
    .as("cq")

const decorateWithTitleCount = (db: Knex): Knex.QueryBuilder =>
  publisherQueryBuilder(db)
    .select("cq._cnt as title_count")
    .leftOuterJoin(
      titleCountQueryBuilder(db),
      "cq.publisher_id",
      "publishers.id"
    )

export const listPublishers = async (
  args: QueryPublishersArgs,
  context: AppContext
): Promise<PublishersPage> => {
  const publishersQuery = decorateWithTitleCount(context.database.db)

  const { result, startCursor, endCursor, hasNextPage } =
    await context.database.paginateQuery<Publisher>(
      publishersQuery,
      args,
      "name"
    )

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
  return await decorateWithTitleCount(context.database.db)
    .where("id", id)
    .first()
}
