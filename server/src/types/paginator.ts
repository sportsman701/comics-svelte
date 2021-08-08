import {
  Comic,
  Publisher,
  QueryComicsArgs,
  QueryPublishersArgs,
  QueryTitlesArgs,
  Title,
} from "./schemas.generated"

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
  startCursor: string | undefined
  endCursor: string | undefined
  hasNextPage: boolean
}

export type QueryPaginatorArgs = {
  pageSize: number | null | undefined
  beforeCursor: string | null | undefined
  afterCursor: string | null | undefined
}
