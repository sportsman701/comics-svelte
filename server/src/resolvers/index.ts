import { listComics, fetchComic } from "./comics"
import { listTitles, fetchTitle, updateTitle } from "./titles"
import { listPublishers, fetchPublisher } from "./publishers"

import grades, { defaultGrade } from "../config/grades"

import {
  Comic,
  ComicsPage,
  Grade,
  MutationUpdateTitleArgs,
  Publisher,
  PublishersPage,
  QueryComicArgs,
  QueryComicsArgs,
  QueryPublisherArgs,
  QueryPublishersArgs,
  QueryTitleArgs,
  QueryTitlesArgs,
  Title,
  TitlesPage,
} from "../types"
import { Resolvers } from "../types"
import { AppContext } from "../modules"

/**
 * Basic resolver signature has positional arguments:
 *   (parent, args, context, info) => result
 */
export const resolvers: Resolvers = {
  Query: {
    comic: async (
      _: any,
      args: QueryComicArgs,
      context: AppContext
    ): Promise<Comic> => await fetchComic(args.id, context),
    comics: async (
      _: any,
      args: QueryComicsArgs,
      context: AppContext
    ): Promise<ComicsPage> => await listComics(args, context),

    title: async (
      _: any,
      args: QueryTitleArgs,
      context: AppContext
    ): Promise<Title> => await fetchTitle(args.id, context),
    titles: async (
      _: any,
      args: QueryTitlesArgs,
      context: AppContext
    ): Promise<TitlesPage> => await listTitles(args, context),

    publisher: async (
      _: any,
      args: QueryPublisherArgs,
      context: AppContext
    ): Promise<Publisher> => await fetchPublisher(args.id, context),
    publishers: async (
      _: any,
      args: QueryPublishersArgs,
      context: AppContext
    ): Promise<PublishersPage> => listPublishers(args, context),
  },

  Mutation: {
    updateTitle: async (
      _: any,
      args: MutationUpdateTitleArgs,
      context: AppContext
    ): Promise<Title> => updateTitle(args.id, args.update, context),
  },

  Comic: {
    title: async (parent: Comic, _: any, context: AppContext): Promise<Title> =>
      await fetchTitle(parent.title_id, context),
    grade: (parent: Comic, _: any, context: AppContext): Grade =>
      grades.find((grade) => grade.id == parent.grade_id) || defaultGrade,
  },

  Title: {
    publisher: async (
      parent: Title,
      _: any,
      context: AppContext
    ): Promise<Publisher> => await fetchPublisher(parent.publisher_id, context),
  },

  Publisher: {
    async titles(
      parent: Publisher,
      _: any,
      context: AppContext
    ): Promise<Title[]> {
      return await context.database
        .db("titles")
        .select("*")
        .where("publisher_id", parent.id)
    },
  },
}
