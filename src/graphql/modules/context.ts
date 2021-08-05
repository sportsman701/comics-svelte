import { Knex } from "knex"
import { db, paginateQuery, countTable } from "../../database"
import { ArgsTypes, PaginationResult, PrimitiveTypes } from "../types/paginator"

type DatabaseContext = {
  db: Knex
  paginateQuery: <T extends PrimitiveTypes>(
    qB: Knex.QueryBuilder,
    a: ArgsTypes
  ) => Promise<PaginationResult<T>>
  countTable: (tN: string) => Promise<number>
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
