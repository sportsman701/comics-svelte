import { db } from "../../database"
import { listComics, fetchComic } from "./comics"
import { listTitles, fetchTitle } from "./titles"
import { listPublishers, fetchPublisher } from "./publishers"
import logger from "../../log"

export const resolvers = {
  Query: {
    comic: async (obj: any, args: any) => await fetchComic(args.id),
    comics: async (obj: any, args: any) => await listComics(args),
    title: async (obj: any, args: any) => await fetchTitle(args.id),
    titles: async (obj: any, args: any) => await listTitles(args),
    publisher: async (obj: any, args: any) => await fetchPublisher(args),
    publishers: async (obj: any, args: any) => await listPublishers(args),
  },
  Comic: {
    async title(comic: any, args: any) {
      return await db("titles").select("*").where("id", comic.title_id).first()
    },
  },
  Title: {
    async publisher(title: any, args: any) {
      return await db("publishers")
        .select("*")
        .where("id", title.publisher_id)
        .first()
    },
  },
  Publisher: {
    async titles(publisher: any, args: any) {
      return await db("titles").select("*").where("publisher_id", publisher.id)
    },
  },
}
