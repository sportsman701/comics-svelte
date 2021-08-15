import { Knex } from "knex"
import {
  ArgsTypes,
  PaginationResult,
  ParsedResult,
  PrimitiveTypes,
  QueryPaginatorArgs,
} from "../types/paginator"

const CURSOR_PREFIX = "id__"

// the `string | number` here is bulls**t because of the id field
// being textual in graphql and we're generating these types from
// the graphql schemas. Probably need a better solution here.
export const encodeCursor = (id: string | number): string => {
  return Buffer.from(CURSOR_PREFIX + id.toString()).toString("base64")
}

export const decodeCursor = (cursor: string): number => {
  const decoded = Buffer.from(cursor, "base64").toString()
  return parseInt(decoded.replace(CURSOR_PREFIX, ""), 10)
}

class QueryPaginator<T> {
  readonly DEFAULT_START = 0
  readonly DEFAULT_PAGE_SIZE = 100

  pageSize: number
  before: number | null
  after: number | null

  constructor(args: QueryPaginatorArgs) {
    this.pageSize =
      typeof args.pageSize === "number" ? args.pageSize : this.DEFAULT_PAGE_SIZE
    this.before = args.beforeCursor ? decodeCursor(args.beforeCursor) : null
    this.after = args.afterCursor ? decodeCursor(args.afterCursor) : null
  }

  getBefore = () => this.before
  getAfter = () => this.after
  getPageSize = () => this.pageSize

  paginateQuery = (queryBuilder: Knex.QueryBuilder): Knex.QueryBuilder => {
    queryBuilder.limit(this.getPageSize() + 1)

    if (this.getBefore()) {
      const orderDir = this.getAfter() ? undefined : "desc"
      queryBuilder.where("id", "<", this.getBefore()).orderBy("id", orderDir)
    }

    if (this.getAfter()) {
      queryBuilder.where("id", ">", this.getAfter()).orderBy("id", "asc")
    }

    return queryBuilder
  }

  query = async (queryBuilder: Knex.QueryBuilder): Promise<ParsedResult<T>> => {
    let result = await queryBuilder
    let hasNextPage = false

    if (result.length > this.getPageSize()) {
      result = result.slice(0, this.getPageSize())
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
    const isBefore = this.getBefore() !== null
    const isAfter = this.getAfter() !== null
    return isBefore && !isAfter
  }
}

export const paginateQuery = async <T extends PrimitiveTypes>(
  queryBuilder: Knex.QueryBuilder,
  args: ArgsTypes
): Promise<PaginationResult<T>> => {
  const paginator = new QueryPaginator<T>({
    pageSize: args.pageSize,
    afterCursor: args.afterCursor,
    beforeCursor: args.beforeCursor,
  })

  const paginatedQueryBuilder = paginator.paginateQuery(queryBuilder)
  const { result, hasNextPage } = await paginator.query(paginatedQueryBuilder)

  const startCursor = result.length ? encodeCursor(result[0].id) : undefined
  const endCursor =
    result.length > 1 ? encodeCursor(result[result.length - 1].id) : undefined

  return {
    result,
    startCursor,
    endCursor,
    hasNextPage,
  }
}
