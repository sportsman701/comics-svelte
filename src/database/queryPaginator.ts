import { Knex } from "knex"

const CURSOR_PREFIX = "id__"

export const encodeCursor = (id: number): string => {
  return Buffer.from(CURSOR_PREFIX + id.toString()).toString("base64")
}

export const decodeCursor = (cursor: string): number => {
  const decoded = Buffer.from(cursor, "base64").toString()
  return parseInt(decoded.replace(CURSOR_PREFIX, ""), 10)
}

class QueryPaginator {
  readonly DEFAULT_START = 0
  readonly DEFAULT_PAGE_SIZE = 100

  pageSize: number
  before: number | null
  after: number | null

  constructor(args: any) {
    this.pageSize =
      parseInt(args.pageSize as string, 10) || this.DEFAULT_PAGE_SIZE
    this.before = args.beforeCursor ? decodeCursor(args.beforeCursor) : null
    this.after = args.afterCursor ? decodeCursor(args.afterCursor) : null
  }

  getBefore = () => this.before
  getAfter = () => this.after
  getPageSize = () => this.pageSize

  paginateQuery = (queryBuilder: Knex.QueryBuilder): void => {
    queryBuilder.limit(this.getPageSize() + 1)

    if (this.getBefore()) {
      queryBuilder.where("id", "<", this.getBefore()).orderBy("id", "desc")
    }

    if (this.getAfter()) {
      queryBuilder.where("id", ">", this.getAfter()).orderBy("id", "asc")
    }
  }

  parseResult = (data: object[]): any => {
    const isBefore = this.getBefore() !== null
    let hasNextPage = false
    let result = data

    if (result.length > this.getPageSize()) {
      result = result.slice(0, this.getPageSize())
      hasNextPage = true
    }

    if (isBefore) {
      result = result.reverse()
    }

    return {
      result,
      hasNextPage,
    }
  }
}

export const paginateQuery = async (
  query: Knex.QueryBuilder,
  args: object
): Promise<any> => {
  const paginator = new QueryPaginator(args)
  paginator.paginateQuery(query)

  const rawResult = await query

  const { result, hasNextPage } = paginator.parseResult(rawResult)

  const startCursor = result.length ? encodeCursor(result[0].id) : null
  const endCursor = result.length
    ? encodeCursor(result[result.length - 1].id)
    : null

  return {
    result,
    startCursor,
    endCursor,
    hasNextPage,
  }
}
