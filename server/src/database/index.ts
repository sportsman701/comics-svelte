import { Knex, knex } from "knex"
import { paginateQuery } from "./queryPaginator"
import { countTable } from "./countTable"

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
//             filename: "./database/production.db"
//         },
//         useNullAsDefault: true
//     }
// }

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./database/production.db",
  },
  useNullAsDefault: true,
}

const db = knex(config)

export { db, paginateQuery, countTable }
