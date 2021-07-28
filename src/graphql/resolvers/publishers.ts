import { db, paginateQuery, countTable } from "../../database"

const publisherQueryBuilder = () =>
  db("publishers").select("publishers.*").orderBy("name", "asc")

export const listPublishers = async (args: any) => {
  const publishersQuery = publisherQueryBuilder()

  const { result, startCursor, endCursor, hasNextPage } = await paginateQuery(
    publishersQuery,
    args
  )

  const totalCount = await countTable("publishers")

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

export const fetchPublisher = async (id: number) => {
  return await publisherQueryBuilder().where("id", id).first()
}
