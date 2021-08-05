import { AppContext } from "../modules/context"
import { Comic, ComicsPage, QueryComicsArgs } from "../types/schemas"
import { Knex } from "knex"

const comicQueryBuilder = (db: Knex) => db("comics").select("comics.*")

export const listComics = async (
  args: QueryComicsArgs,
  context: AppContext
): Promise<ComicsPage> => {
  const comicsQuery = comicQueryBuilder(context.database.db).modify(
    (queryBuilder) => {
      if (args.title_id) {
        queryBuilder.where("title_id", args.title_id)
      }
      if (args.publisher_id) {
        queryBuilder
          .join("titles", "comics.title_id", "=", "titles.id")
          .join(
            "publishers",
            "titles.publisher_id",
            "=",
            args.publisher_id.toString()
          )
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
