import { Knex, knex } from "knex"
import { joinedObjectParser } from "./joinedObjectParser"
import { idsParser } from "./idsparser"
import { Pagination } from "./pagination"
import { paginateQuery } from "./queryPaginator"

const environment = process.env.NODE_ENV || "production"
console.log(`Environment: ${environment}`)

// const configs = {
//     "test": {
//         client: "sqlite3",
//         connection: ":memory:",
//         useNullAsDefault: true
//     },
//     "development": {
//         client: "sqlite3",
//         connection: {
//             filename: "./src/database/comics.db"
//         },
//         useNullAsDefault: true
//     }
// }

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./src/database/production.db",
  },
  useNullAsDefault: true,
}

const db = knex(config)

const countTable = async (tableName: string): Promise<number> => {
  return new Promise((resolve, reject): void => {
    db(tableName)
      .count<Record<string, number>>({ count: 0 })
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

export {
  db,
  joinedObjectParser,
  idsParser,
  Pagination,
  paginateQuery,
  countTable,
}
