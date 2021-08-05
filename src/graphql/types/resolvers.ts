import { GraphQLResolveInfo } from "graphql"
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Comic: ResolverTypeWrapper<Comic>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  String: ResolverTypeWrapper<Scalars["String"]>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  ComicsPage: ResolverTypeWrapper<ComicsPage>
  PageInfo: ResolverTypeWrapper<PageInfo>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  Publisher: ResolverTypeWrapper<Publisher>
  PublishersPage: ResolverTypeWrapper<PublishersPage>
  Query: ResolverTypeWrapper<{}>
  Title: ResolverTypeWrapper<Title>
  TitlesPage: ResolverTypeWrapper<TitlesPage>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Comic: Comic
  Int: Scalars["Int"]
  String: Scalars["String"]
  ID: Scalars["ID"]
  ComicsPage: ComicsPage
  PageInfo: PageInfo
  Boolean: Scalars["Boolean"]
  Publisher: Publisher
  PublishersPage: PublishersPage
  Query: {}
  Title: Title
  TitlesPage: TitlesPage
}

export type ComicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Comic"] = ResolversParentTypes["Comic"]
> = {
  date?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  grade_id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  issue_no?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  title?: Resolver<ResolversTypes["Title"], ParentType, ContextType>
  title_id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ComicsPageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ComicsPage"] = ResolversParentTypes["ComicsPage"]
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Comic"]>>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
  endCursor?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  hasNextPage?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >
  startCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PublisherResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Publisher"] = ResolversParentTypes["Publisher"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  titles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Title"]>>>,
    ParentType,
    ContextType
  >
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PublishersPageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PublishersPage"] = ResolversParentTypes["PublishersPage"]
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Publisher"]>>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  comic?: Resolver<
    Maybe<ResolversTypes["Comic"]>,
    ParentType,
    ContextType,
    RequireFields<QueryComicArgs, "id">
  >
  comics?: Resolver<
    Maybe<ResolversTypes["ComicsPage"]>,
    ParentType,
    ContextType,
    RequireFields<QueryComicsArgs, "afterCursor" | "beforeCursor" | "pageSize">
  >
  publisher?: Resolver<
    Maybe<ResolversTypes["Publisher"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPublisherArgs, "id">
  >
  publishers?: Resolver<
    Maybe<ResolversTypes["PublishersPage"]>,
    ParentType,
    ContextType,
    RequireFields<
      QueryPublishersArgs,
      "afterCursor" | "beforeCursor" | "pageSize"
    >
  >
  title?: Resolver<
    Maybe<ResolversTypes["Title"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTitleArgs, "id">
  >
  titles?: Resolver<
    Maybe<ResolversTypes["TitlesPage"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTitlesArgs, "afterCursor" | "beforeCursor" | "pageSize">
  >
}

export type TitleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Title"] = ResolversParentTypes["Title"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  issues?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  publisher?: Resolver<ResolversTypes["Publisher"], ParentType, ContextType>
  publisher_id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  volume?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  year?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TitlesPageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TitlesPage"] = ResolversParentTypes["TitlesPage"]
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Title"]>>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Comic?: ComicResolvers<ContextType>
  ComicsPage?: ComicsPageResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Publisher?: PublisherResolvers<ContextType>
  PublishersPage?: PublishersPageResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Title?: TitleResolvers<ContextType>
  TitlesPage?: TitlesPageResolvers<ContextType>
}
