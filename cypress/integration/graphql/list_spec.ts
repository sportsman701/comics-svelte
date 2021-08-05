import { encodeCursor } from "../../../src/database/queryPaginator"

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
    })
      .its("body")
      .then((body) => {
        const { totalCount, items, pageInfo } = body["data"]["comics"]

        expect(items.length).to.equal(5)
        expect(pageInfo["hasNextPage"]).to.equal(true)

        const firstCursor = encodeCursor(items[0].id)
        const lastCursor = encodeCursor(items[items.length - 1].id)

        expect(pageInfo["startCursor"]).to.equal(firstCursor)
        expect(pageInfo["endCursor"]).to.equal(lastCursor)
      })
  })
})
