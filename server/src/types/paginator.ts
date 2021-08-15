import {
  Comic,
  Publisher,
  QueryComicsArgs,
  QueryPublishersArgs,
  QueryTitlesArgs,
  Title,
} from "./schemas.generated"

type MaybeUndefined<T> = T | undefined
type MaybeNullUndefined<T> = T | null | undefined
export type PrimitiveTypes = Comic | Publisher | Title
export type ArgsTypes = QueryComicsArgs | QueryPublishersArgs | QueryTitlesArgs

export type ParsedResult<T> = {
  __typename?: "ParsedResult"
  result: T[]
  hasNextPage: boolean
}

export type PaginationResult<T> = {
  __typename?: "PaginationResult"
  result: T[]
  startCursor: MaybeUndefined<string>
  endCursor: MaybeUndefined<string>
  hasNextPage: boolean
}

export type QueryPaginatorArgs = {
  pageSize: MaybeNullUndefined<number>
  beforeCursor: MaybeNullUndefined<string>
  afterCursor: MaybeNullUndefined<string>
  sortKey: string
}
