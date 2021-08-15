import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("Comics", (table) => {
    table.index("title_id", "comic_title_id")
    table.index(["title_id", "issue_no"], "comic_title_id_issue_no")
  })
  await knex.schema.table("Titles", (table) => {
    table.index("publisher_id", "title_publisher_id")
    table.index(["publisher_id", "name"], "title_publisher_id_name")
  })
  await knex.schema.table("Publishers", (table) => {
    table.index("name", "publisher_name")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("Comics", (table) => {
    table.dropIndex("title_id", "comic_title_id")
  })
  await knex.schema.table("Titles", (table) => {
    table.dropIndex("publisher_id", "title_publisher_id")
  })
  await knex.schema.table("Publishers", (table) => {
    table.dropIndex("name", "publisher_name")
  })
}
