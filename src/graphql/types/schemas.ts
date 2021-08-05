export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Comic = {
  __typename?: "Comic"
  date?: Maybe<Scalars["Int"]>
  description?: Maybe<Scalars["String"]>
  grade_id: Scalars["Int"]
  id: Scalars["ID"]
  issue_no?: Maybe<Scalars["Int"]>
  title: Title
  title_id: Scalars["Int"]
}

export type ComicsPage = {
  __typename?: "ComicsPage"
  items?: Maybe<Array<Maybe<Comic>>>
  pageInfo?: Maybe<PageInfo>
  totalCount: Scalars["Int"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  endCursor?: Maybe<Scalars["String"]>
  hasNextPage?: Maybe<Scalars["Boolean"]>
  startCursor?: Maybe<Scalars["String"]>
}

export type Publisher = {
  __typename?: "Publisher"
  id: Scalars["ID"]
  name: Scalars["String"]
  titles?: Maybe<Array<Maybe<Title>>>
  url?: Maybe<Scalars["String"]>
}

export type PublishersPage = {
  __typename?: "PublishersPage"
  items?: Maybe<Array<Maybe<Publisher>>>
  pageInfo?: Maybe<PageInfo>
  totalCount: Scalars["Int"]
}

export type Query = {
  __typename?: "Query"
  comic?: Maybe<Comic>
  comics?: Maybe<ComicsPage>
  publisher?: Maybe<Publisher>
  publishers?: Maybe<PublishersPage>
  title?: Maybe<Title>
  titles?: Maybe<TitlesPage>
}

export type QueryComicArgs = {
  id: Scalars["Int"]
}

export type QueryComicsArgs = {
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  publisher_id?: Maybe<Scalars["Int"]>
  title_id?: Maybe<Scalars["Int"]>
}

export type QueryPublisherArgs = {
  id: Scalars["Int"]
}

export type QueryPublishersArgs = {
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
}

export type QueryTitleArgs = {
  id: Scalars["Int"]
}

export type QueryTitlesArgs = {
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  publisher_id?: Maybe<Scalars["String"]>
}

export type Title = {
  __typename?: "Title"
  id: Scalars["ID"]
  issues?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
  publisher: Publisher
  publisher_id: Scalars["Int"]
  url?: Maybe<Scalars["String"]>
  volume?: Maybe<Scalars["Int"]>
  year?: Maybe<Scalars["Int"]>
}

export type TitlesPage = {
  __typename?: "TitlesPage"
  items?: Maybe<Array<Maybe<Title>>>
  pageInfo?: Maybe<PageInfo>
  totalCount: Scalars["Int"]
}
