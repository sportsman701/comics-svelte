import type { Knex } from "knex"

export const seed = async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  await knex("Publishers")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Publishers").insert([
        { id: 1, name: "Publisher D", url: null },
        { id: 2, name: "Publisher B", url: "https://publisher2.com" },
        { id: 3, name: "Publisher C", url: null },
        { id: 4, name: "Publisher A", url: null },
        { id: 5, name: "Publisher E", url: null }
      ])
    })

  await knex("Titles")
    .del()
    .then(() => {
      return knex("Titles").insert([
        {id: 1, name: "Title A (Publisher D)", publisher_id: 1, url: null, issues: null, year: 1984, volume: null },
        {id: 2, name: "Title B (Publisher D)", publisher_id: 1, url: "https://title2.com", issues: 6, year: 1992, volume: 1 },
        {id: 3, name: "Title E (Publisher B)", publisher_id: 2, url: null, issues: null, year: null, volume: null },
        {id: 4, name: "Title D (Publisher B)", publisher_id: 2, url: null, issues: null, year: 2001, volume: null },
        {id: 5, name: "Title C (Publisher E)", publisher_id: 5, url: null, issues: null, year: 2011, volume: null },
        {id: 6, name: "Title F (Publisher A)", publisher_id: 4, url: null, issues: null, year: 2020, volume: null }
      ])
    })

  await knex("Comics")
    .del()
    .then(() => {
      return knex("Comics").insert([
        { id: 1, title_id: 1, issue_no: 1, grade_id: 5, description: "Issue 1 (Title A)", date: null },
        { id: 2, title_id: 1, issue_no: 2, grade_id: 5, description: "Issue 2 (Title A)", date: null },
        { id: 3, title_id: 1, issue_no: 3, grade_id: 5, description: "Issue 3 (Title A)", date: null },
        { id: 4, title_id: 1, issue_no: 4, grade_id: 5, description: "Issue 4 (Title A)", date: null },
        { id: 5, title_id: 1, issue_no: 5, grade_id: 5, description: "Issue 5 (Title A)", date: null },
        { id: 6, title_id: 1, issue_no: 6, grade_id: 5, description: "Issue 6 (Title A)", date: null },
        { id: 7, title_id: 2, issue_no: 1, grade_id: 5, description: "Issue 1 (Title B)", date: null },
        { id: 8, title_id: 2, issue_no: 2, grade_id: 5, description: "Issue 2 (Title B)", date: null },
        { id: 9, title_id: 2, issue_no: 3, grade_id: 5, description: "Issue 3 (Title B)", date: null },
        { id: 10, title_id: 2, issue_no: 4, grade_id: 5, description: "Issue 4 (Title B)", date: null },
        { id: 11, title_id: 2, issue_no: 5, grade_id: 5, description: "Issue 5 (Title B)", date: null },
        { id: 12, title_id: 2, issue_no: 6, grade_id: 5, description: "Issue 6 (Title B)", date: null },
        { id: 13, title_id: 3, issue_no: 6, grade_id: 2, description: "Issue 6 (Title E)", date: null },
        { id: 14, title_id: 3, issue_no: 5, grade_id: 3, description: "Issue 5 (Title E)", date: null },
        { id: 15, title_id: 3, issue_no: 4, grade_id: 5, description: "Issue 4 (Title E)", date: null },
        { id: 16, title_id: 3, issue_no: 1, grade_id: 12, description: "Issue 1 (Title E)", date: null },
        { id: 17, title_id: 3, issue_no: 3, grade_id: 4, description: "Issue 3 (Title E)", date: null },
        { id: 18, title_id: 3, issue_no: 2, grade_id: 0, description: "Issue 2 (Title E)", date: null },
      ])
    })
}
