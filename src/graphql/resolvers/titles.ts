import { db, paginateQuery, countTable } from "../../database"

const titleQueryBuilder = () =>
  db("titles").select("titles.*").orderBy("name", "asc")

export const listTitles = async (args: any) => {
  const titleQuery = titleQueryBuilder().modify((queryBuilder) => {
    if (args.publisher_id) {
      queryBuilder.where("publisher_id", args.publisher_id)
    }
  })

  const { result, startCursor, endCursor, hasNextPage } = await paginateQuery(
    titleQuery,
    args
  )

  const totalCount = await countTable("titles")

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

export const fetchTitle = async (id: number) => {
  return await titleQueryBuilder().where("id", id).first()
}
