import type { Knex } from "knex"
import { db } from "./index"

export type CountFilter = (qB: Knex.QueryBuilder) => void

export const countTable = async (
  tableName: string,
  filter?: CountFilter
): Promise<number> => {
  return new Promise((resolve, reject): void => {
    db(tableName)
      .count<Record<string, number>>({ count: 0 })
      .modify((queryBuilder) => {
        if (filter) {
          filter(queryBuilder)
        }
      })
      .first()
      .then((result) => {
        if (result === undefined) {
          reject("Coult not count table `" + tableName + "`")
        } else {
          resolve(result.count as number)
        }
      })
  })
}
