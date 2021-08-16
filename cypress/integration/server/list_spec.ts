import { encodeCursor } from "../../../server/src/database/queryPaginator"

describe("GraphQL: lists", () => {
  it("Comics List OK", () => {
    cy.request("POST", "/graphql", {
      query: `{
          comics {
            totalCount,
            items {
              id
            },
            pageInfo {
              startCursor,
              endCursor,
              hasNextPage
            }
          },
          publishers {
            totalCount,
            items {
              id
            },
            pageInfo {
              startCursor,
              endCursor,
              hasNextPage
            }
          },
          titles {
            totalCount,
            items {
              id
            },
            pageInfo {
              startCursor,
              endCursor,
              hasNextPage
            }
          }
      }`,
    }).then((response) => {
      const { body, headers, status } = response

      expect(headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      )
      expect(status).to.equal(200)

      expect(body).to.have.all.keys(["data"])
      expect(body["data"]).to.have.all.keys(["comics", "publishers", "titles"])

      Object.entries(body["data"]).forEach(([key, value]) => {
        expect(value).to.have.all.keys(["totalCount", "items", "pageInfo"])

        expect(value["pageInfo"]).to.have.all.keys([
          "startCursor",
          "endCursor",
          "hasNextPage",
        ])
      })
    })
  })

  it("List can return page size of 5", () => {
    cy.request("POST", "/graphql", {
      query: `{
        comics(pageSize: 5) {
          items {
            issue_no
          },
          pageInfo {
            startCursor,
            endCursor,
            hasNextPage
          }
        }
      }`,
    })
      .its("body")
      .then((body) => {
        const { items, pageInfo } = body["data"]["comics"]

        expect(items.length).to.equal(5)
        expect(pageInfo["hasNextPage"]).to.equal(true)

        /**
         * Comics cursors are keyed off of issue_id to match the sort order
         */
        const firstCursor = encodeCursor(items[0].issue_no)
        const lastCursor = encodeCursor(items[items.length - 1].issue_no)

        expect(pageInfo["startCursor"]).to.equal(firstCursor)
        expect(pageInfo["endCursor"]).to.equal(lastCursor)
      })
  })

  it("List items are ordered by the proper keys", () => {
    /**
     * Ensures that the different lists are returned as ordered by different keys:
     * - Titles: name
     * - Publishers: name
     * - Comics: issue_no
     *
     * These items, if ordered by ID from the database, will not produce these sequences
     */
    cy.request("POST", "/graphql", {
      query: `{
        comics(titleId: 3) {
          items {
            id
            issue_no
          }
        }
        titles {
          items{
            id
            name
          }
        }
        publishers {
          items {
            id
            name
          }
        }
      }`,
    })
      .its("body")
      .then((body) => {
        const { comics, publishers, titles } = body["data"]

        const expectedComics = [
          { id: "16", issue_no: 1 },
          { id: "18", issue_no: 2 },
          { id: "17", issue_no: 3 },
          { id: "15", issue_no: 4 },
          { id: "14", issue_no: 5 },
          { id: "13", issue_no: 6 },
        ]
        expect(expectedComics).to.deep.equal(comics.items)

        const expectedTitles = [
          { id: "1", name: "Title A (Publisher D)" },
          { id: "2", name: "Title B (Publisher D)" },
          { id: "5", name: "Title C (Publisher E)" },
          { id: "4", name: "Title D (Publisher B)" },
          { id: "3", name: "Title E (Publisher B)" },
          { id: "6", name: "Title F (Publisher A)" },
        ]
        expect(expectedTitles).to.deep.equal(titles.items)

        const expectedPublishers = [
          { id: "4", name: "Publisher A" },
          { id: "2", name: "Publisher B" },
          { id: "3", name: "Publisher C" },
          { id: "1", name: "Publisher D" },
          { id: "5", name: "Publisher E" },
        ]
        expect(expectedPublishers).to.deep.equal(publishers.items)
      })
  })
})
