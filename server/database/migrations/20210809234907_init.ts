import type { Knex } from "knex"

export const up = (knex: Knex): Promise<void> => {
  return knex.schema
    .createTable("Comics", (table) => {
      table.increments("id")
      table.integer("title_id")
      table.integer("issue_no")
      table.integer("grade_id")
      table.string("description")
      table.integer("date")
    })
    .createTable("Publishers", (table) => {
      table.increments("id")
      table.string("name")
      table.string("url")
    })
    .createTable("Titles", (table) => {
      table.increments("id")
      table.text("name")
      table.integer("publisher_id")
      table.string("url")
      table.integer("issues")
      table.integer("year")
      table.integer("volume")
    })
}

export const down = (knex: Knex): Promise<void> => {
  return knex.schema
    .dropTable("Comics")
    .dropTable("Publishers")
    .dropTable("Titles")
}
