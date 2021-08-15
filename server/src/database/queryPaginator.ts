import { Knex } from "knex"
import {
  ArgsTypes,
  PaginationResult,
  ParsedResult,
  PrimitiveTypes,
  QueryPaginatorArgs,
} from "../types/paginator"

const CURSOR_PREFIX = "id__"

export const encodeCursor = (id: any): string => {
  return Buffer.from(CURSOR_PREFIX + id.toString()).toString("base64")
}

export const decodeCursor = (cursor: string): number => {
  const decoded = Buffer.from(cursor, "base64").toString()
  return parseInt(decoded.replace(CURSOR_PREFIX, ""), 10)
}

class QueryPaginator<T> {
  readonly DEFAULT_START = 0
  readonly DEFAULT_PAGE_SIZE = 100
  readonly DEFAULT_SORT_KEY = "id"

  pageSize: number
  before: number | null
  after: number | null
  sortKey: string

  constructor(args: QueryPaginatorArgs) {
    this.pageSize =
      typeof args.pageSize === "number" ? args.pageSize : this.DEFAULT_PAGE_SIZE
    this.before = args.beforeCursor ? decodeCursor(args.beforeCursor) : null
    this.after = args.afterCursor ? decodeCursor(args.afterCursor) : null
    this.sortKey = args.sortKey
  }

  paginateQuery = (queryBuilder: Knex.QueryBuilder): Knex.QueryBuilder => {
    queryBuilder.limit(this.pageSize + 1)

    if (this.before) {
      const orderDir = this.after ? undefined : "desc"
      queryBuilder.where(this.sortKey, "<", this.after).orderBy("id", orderDir)
    }

    if (this.after) {
      queryBuilder.where(this.sortKey, ">", this.after).orderBy("id", "asc")
    }

    return queryBuilder
  }

  query = async (queryBuilder: Knex.QueryBuilder): Promise<ParsedResult<T>> => {
    let result = await queryBuilder
    let hasNextPage = false

    if (result.length > this.pageSize) {
      result = result.slice(0, this.pageSize)
      hasNextPage = true
    }

    // Due to the query semantics of getting items Before a cursor, we
    // need to reverse the results of pure Before queries to standardize
    // on an ascending id order
    if (this.shouldReverseResults()) {
      result = result.reverse()
    }

    return {
      result,
      hasNextPage,
    }
  }

  shouldReverseResults = (): boolean => {
    const isBefore = this.before !== null
    const isAfter = this.after !== null
    return isBefore && !isAfter
  }
}

export const paginateQuery = async <T extends PrimitiveTypes>(
  queryBuilder: Knex.QueryBuilder,
  args: ArgsTypes,
  sortKey: keyof T
): Promise<PaginationResult<T>> => {
  const paginator = new QueryPaginator<T>({
    pageSize: args.pageSize,
    afterCursor: args.afterCursor,
    beforeCursor: args.beforeCursor,
    sortKey: sortKey as string,
  })

  const paginatedQueryBuilder = paginator.paginateQuery(queryBuilder)
  const { result, hasNextPage } = await paginator.query(paginatedQueryBuilder)

  type SK = keyof T
  const getObjectValue = (a: T, key: SK): any => {
    return a[key]
  }

  const startCursor = result.length
    ? encodeCursor(getObjectValue(result[0], sortKey))
    : undefined
  const endCursor =
    result.length > 1
      ? encodeCursor(getObjectValue(result[result.length - 1], sortKey))
      : undefined

  return {
    result,
    startCursor,
    endCursor,
    hasNextPage,
  }
}
