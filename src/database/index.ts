import { Knex, knex } from "knex"
import { joinedObjectParser } from "./joinedObjectParser"
import { idsParser } from "./idsparser"
import { Pagination } from "./pagination"

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

export { db, joinedObjectParser, idsParser, Pagination }
