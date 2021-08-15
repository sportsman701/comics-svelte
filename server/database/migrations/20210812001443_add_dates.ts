import type { Knex } from "knex"

const created = new Date("2015/04/23 10:30:00 PST").getTime() / 1000
const updated = new Date("2021/07/10 17:30:00 PST").getTime() / 1000

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema
    .table("Comics", (table) => {
      table.integer("date_created")
      table.integer("date_updated")
    })
    .then(async () => {
      await knex("Comics")
        .update("date_created", created)
        .update("date_updated", updated)
    })

  await knex.schema
    .table("Publishers", (table) => {
      table.integer("date_created")
      table.integer("date_updated")
    })
    .then(async () => {
      await knex("Publishers")
        .update("date_created", created)
        .update("date_updated", updated)
    })

  await knex.schema
    .table("Titles", (table) => {
      table.integer("date_created")
      table.integer("date_updated")
    })
    .then(async () => {
      await knex("Titles")
        .update("date_created", created)
        .update("date_updated", updated)
    })
}

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.table("Comics", (table) => {
    table.dropColumn("date_created")
    table.dropColumn("date_updated")
  })

  await knex.schema.table("Publishers", (table) => {
    table.dropColumn("date_created")
    table.dropColumn("date_updated")
  })

  await knex.schema.table("Titles", (table) => {
    table.dropColumn("date_created")
    table.dropColumn("date_updated")
  })
}
