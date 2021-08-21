import { listComics, fetchComic } from "./comics"
import { listTitles, fetchTitle, updateTitle } from "./titles"
import { listPublishers, fetchPublisher } from "./publishers"

import grades, { defaultGrade } from "../config/grades"

import type {
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
  Series,
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
    series: async (
      parent: Comic,
      _: any,
      context: AppContext
    ): Promise<Series> => {
      if (!parent.issue_no && parent.issue_no !== 0) {
        return {
          next: null,
          previous: null,
        }
      }

      const previous: Comic = await context.database
        .db("comics")
        .where("title_id", parent.title_id)
        .where("issue_no", "<", parent.issue_no)
        .orderBy("issue_no", "desc")
        .limit(1)
        .first()

      const next: Comic = await context.database
        .db("comics")
        .where("title_id", parent.title_id)
        .where("issue_no", ">", parent.issue_no)
        .orderBy("issue_no", "asc")
        .limit(1)
        .first()

      return {
        previous: previous ? previous.id : undefined,
        next: next ? next.id : undefined,
      }
    },
  },

  Title: {
    publisher: async (
      parent: Title,
      _: any,
      context: AppContext
    ): Promise<Publisher> => await fetchPublisher(parent.publisher_id, context),
    series: async (
      parent: Title,
      _: any,
      context: AppContext
    ): Promise<Series> => {
      const previous: Title = await context.database
        .db("titles")
        .where("name", "<", parent.name)
        .orderBy("name", "desc")
        .limit(1)
        .first()

      const next: Title = await context.database
        .db("titles")
        .where("name", ">", parent.name)
        .orderBy("name", "asc")
        .limit(1)
        .first()

      return {
        previous: previous ? previous.id : undefined,
        next: next ? next.id : undefined,
      }
    },
  },
  Publisher: {
    series: async (
      parent: Publisher,
      _: any,
      context: AppContext
    ): Promise<Series> => {
      const previous: Title = await context.database
        .db("publishers")
        .where("name", "<", parent.name)
        .orderBy("name", "desc")
        .limit(1)
        .first()

      const next: Title = await context.database
        .db("publishers")
        .where("name", ">", parent.name)
        .orderBy("name", "asc")
        .limit(1)
        .first()

      return {
        previous: previous ? previous.id : undefined,
        next: next ? next.id : undefined,
      }
    },
  },
}
