describe("Healthcheck", () => {
  it("Healthcheck OK", () => {
    cy.request("GET", "/healthcheck").then((response) => {
      const { body, headers, status } = response

      expect(headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      )

      expect(status).to.deep.equal(200)
      expect(body.status).to.equal("OK")
    })
  })
})
