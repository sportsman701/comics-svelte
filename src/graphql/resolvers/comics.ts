import { db, paginateQuery, countTable } from "../../database"

const comicQueryBuilder = () => db("comics").select("comics.*")

export const listComics = async (args: any) => {
  const comicsQuery = comicQueryBuilder().modify((queryBuilder) => {
    if (args.title_id) {
      queryBuilder.where("title_id", args.title_id)
    }
    if (args.publisher_id) {
      queryBuilder
        .join("titles", "comics.title_id", "=", "titles.id")
        .join("publishers", "titles.publisher_id", "=", args.publisher_id)
    }
  })

  const { result, startCursor, endCursor, hasNextPage } = await paginateQuery(
    comicsQuery,
    args
  )

  const totalCount = await countTable("comics")

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

export const fetchComic = async (id: number) => {
  return await comicQueryBuilder().where("id", id).first()
}
