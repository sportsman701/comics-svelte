describe("Publishers List", () => {
  it("Publishers List is OK", () => {
    cy.request("/v1/publishers").then((response) => {
      const { body, headers, status } = response

      expect(headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      )
      expect(status).to.equal(200)

      expect(body).to.have.all.keys(["publishers", "meta"])

      const { publishers, meta } = body

      expect(publishers[0]).to.have.all.keys(["id", "name", "url"])

      expect(publishers).to.have.length(9)

      expect(meta).to.deep.equal({
        page: 1,
        pageSize: 100,
        previousPage: null,
        nextPage: null,
      })
    })
  })
})
