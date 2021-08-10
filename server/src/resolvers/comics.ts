import { AppContext } from "../modules"
import { Comic, ComicsPage, QueryComicsArgs } from "../types"
import { Knex } from "knex"

const comicQueryBuilder = (db: Knex) => db("comics").select("comics.*")

export const listComics = async (
  args: QueryComicsArgs,
  context: AppContext
): Promise<ComicsPage> => {
  const comicsQuery = comicQueryBuilder(context.database.db).modify(
    (queryBuilder) => {
      if (args.titleId) {
        queryBuilder.where("title_id", args.titleId)
      }
      if (args.publisherId) {
        queryBuilder
          .join("titles", "comics.title_id", "=", "titles.id")
          .join("publishers", "publishers.id", "=", args.publisherId.toString())
      }
    }
  )

  const { result, startCursor, endCursor, hasNextPage } =
    await context.database.paginateQuery<Comic>(comicsQuery, args)

  const totalCount = await context.database.countTable("comics")

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

export const fetchComic = async (
  id: number,
  context: AppContext
): Promise<Comic> => {
  return await comicQueryBuilder(context.database.db).where("id", id).first()
}
