describe("GraphQL: instances", () => {
  it("Comics Instance OK", () => {
    cy.request("POST", "/graphql", {
      query: `{
          comic(id: 1) {
            id,
            title {
              id
            }
          },
          title(id: 1) {
            id,
            publisher {
              id
            }
          },
          publisher(id: 1) {
            id,
            titles {
              id
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
      expect(body["data"]).to.have.all.keys(["comic", "publisher", "title"])

      const { comic, title, publisher } = body["data"]

      // Comic
      expect(comic).to.have.all.keys(["id", "title"])

      // Title
      expect(title).to.have.all.keys(["id", "publisher"])

      // Publisher
      expect(publisher).to.have.all.keys(["id", "titles"])
    })
  })
})
