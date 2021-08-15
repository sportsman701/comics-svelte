import type { Knex } from "knex"
import { db, paginateQuery, countTable } from "../database"
import type { CountFilter } from "../database/countTable"
import { ArgsTypes, PaginationResult, PrimitiveTypes } from "../types/paginator"

type DatabaseContext = {
  db: Knex
  paginateQuery: <T extends PrimitiveTypes>(
    qB: Knex.QueryBuilder,
    a: ArgsTypes,
    sK?: string
  ) => Promise<PaginationResult<T>>
  countTable: (tN: string, f?: CountFilter) => Promise<number>
}

export type AppContext = {
  database: DatabaseContext
}

export const context: AppContext = {
  database: {
    db,
    paginateQuery,
    countTable,
  },
}
