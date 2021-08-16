describe("Index", () => {
  it("Index page OK", () => {
    cy.request("GET", "/").then((response) => {
      // cy.task("log", JSON.stringify(response))
    })
  })
})
