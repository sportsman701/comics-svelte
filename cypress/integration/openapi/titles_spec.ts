describe("Titles List", () => {
  it("Titles List is OK", () => {
    cy.request("/v1/titles").then((response) => {
      const { body, headers, status } = response

      expect(headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      )
      expect(status).to.equal(200)

      expect(body).to.have.all.keys(["titles", "meta"])

      const { titles, meta } = body

      expect(titles[0]).to.have.all.keys([
        "id",
        "name",
        "publisher_id",
        "url",
        "issues",
        "year",
        "volume",
        "publisher",
      ])

      expect(titles).to.have.length(100)

      expect(meta).to.deep.equal({
        page: 1,
        pageSize: 100,
        previousPage: null,
        nextPage: 2,
      })
    })
  })

  it("Titles list filter can return page size of 5, page 1", () => {
    cy.request("/v1/titles?pageSize=5").its("body").assertListPagination({
      listKey: "titles",
      page: 1,
      pageSize: 5,
      previousPage: null,
      nextPage: 2,
    })
  })
})
