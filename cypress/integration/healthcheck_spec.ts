describe("Healthcheck", () => {
    it("Is OK", () => {
        cy.request("/")
            .its("headers")
            .its("content-type")
            .should("include", "application/json")
    })
})