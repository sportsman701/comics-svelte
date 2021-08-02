import { Comic } from "../../src/schemas"

describe("Comics List", () => {
  it("Comics List is OK", () => {
    cy.request("/v1/comics").then((response) => {
      const { body, headers, status } = response

      expect(headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      )
      expect(status).to.equal(200)

      expect(body).to.have.all.keys(["comics", "meta"])

      const { comics, meta } = body

      expect(comics[0]).to.have.all.keys([
        "id",
        "description",
        "issue",
        "date",
        "grade",
        "publisher",
        "title",
      ])

      expect(comics).to.have.length(100)

      expect(meta).to.deep.equal({
        page: 1,
        pageSize: 100,
        previousPage: null,
        nextPage: 2,
      })
    })
  })

  it("Comics list filter can return page size of 5, page 1", () => {
    cy.request("/v1/comics?pageSize=5").its("body").assertListPagination({
      listKey: "comics",
      page: 1,
      pageSize: 5,
      previousPage: null,
      nextPage: 2,
    })
  })

  it("Comics list filter can return page size of 10, page 2", () => {
    cy.request("/v1/comics?pageSize=10&page=2")
      .its("body")
      .assertListPagination({
        listKey: "comics",
        page: 2,
        pageSize: 10,
        previousPage: 1,
        nextPage: 3,
      })
  })

  it("Comics list filter can filter by a single publisher", () => {
    cy.request("/v1/comics?publisherIds=1")
      .its("body")
      .then((response) => {
        const publisherIds = response["comics"].map(
          (a: Comic) => a["publisher"]["id"]
        )
        expect([...new Set(publisherIds)]).to.deep.equal([1])
      })
  })

  it("Comics list filter can filter by multiple publishers", () => {
    cy.request("/v1/comics?publisherIds=3,4")
      .its("body")
      .then((response) => {
        const publisherIds = response["comics"].map(
          (a: Comic) => a["publisher"]["id"]
        )
        expect([...new Set(publisherIds)]).to.deep.equal([3, 4])
      })
  })

  it("Comics list filter can filter by a single grade", () => {
    cy.request("/v1/comics?gradeIds=5")
      .its("body")
      .then((response) => {
        const gradeIds = response["comics"].map((a: Comic) => a["grade"]["id"])
        expect([...new Set(gradeIds)]).to.deep.equal([5])
      })
  })

  it("Comics list filter can filter by multiple grades", () => {
    cy.request("/v1/comics?gradeIds=5,12")
      .its("body")
      .then((response) => {
        const gradeIds = response["comics"].map((a: Comic) => a["grade"]["id"])
        expect([...new Set(gradeIds)]).to.deep.equal([5, 12])
      })
  })

  it("Comics list filter can filter by a single title", () => {
    cy.request("/v1/comics?titleIds=10")
      .its("body")
      .then((response) => {
        const titleIds = response["comics"].map((a: Comic) => a["title"]["id"])
        expect([...new Set(titleIds)]).to.deep.equal([10])
      })
  })

  it("Comics list filter can filter by multiple titles", () => {
    cy.request("/v1/comics?titleIds=10,11")
      .its("body")
      .then((response) => {
        const titleIds = response["comics"].map((a: Comic) => a["title"]["id"])
        expect([...new Set(titleIds)]).to.deep.equal([10, 11])
      })
  })

  it("Comics list bad request on bad page size", () => {
    cy.request({
      url: "/v1/comics?pageSize=0",
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 400)
  })

  it("Comics list bad request on bad page", () => {
    cy.request({
      url: "/v1/comics?page=0",
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 400)
  })
})

describe("Comics Instance", () => {
  it("Comics Instance is OK", () => {
    cy.request("/v1/comics/1").then((response) => {
      expect(response.headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      )
      expect(response.status).to.equal(200)
    })
  })

  it("Comics instance 404 on non-existent instance", () => {
    cy.request({
      url: "/v1/comics/99999999",
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 404)
  })

  it("Comics instance returnes bad request on invalid id", () => {
    cy.request({
      url: "/v1/comics/foo",
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 400)
  })
})
