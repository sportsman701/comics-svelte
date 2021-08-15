import { knex } from "knex"
import type { Knex } from "knex"
import { paginateQuery } from "./queryPaginator"
import { countTable } from "./countTable"
const databaseConfigs = require("../../knexfile.ts")

const environment = process.env.NODE_ENV || "development"
console.log(`DB Environment: ${environment}`)

const config: Knex.Config = databaseConfigs[environment]
const db = knex(config)

if (environment === "test") {
  console.log("Running DB migrations & seeding test data")
  db.migrate.latest().then(() => {
    db.seed.run()
  })
}

export { db, paginateQuery, countTable }
