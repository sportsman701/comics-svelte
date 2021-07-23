// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("assertListPagination", 
    { prevSubject: true }, 
    (subject, {
        listKey,
        page,
        pageSize,
        previousPage,
        nextPage
    }) => {
        expect(subject[listKey]).to.have.length(pageSize)
        expect(subject["meta"]).to.deep.equal({
            "page": page,
            "pageSize": pageSize,
            "previousPage": previousPage,
            "nextPage": nextPage        
        })

        return subject
})

declare namespace Cypress {
    interface ListAssertionParameters {
        listKey: string,
        page: number,
        pageSize: number,
        previousPage: number | null,
        nextPage: number | null
    }

    interface Chainable {
        assertListPagination({
            listKey,
            page,
            pageSize,
            previousPage,
            nextPage
        }: ListAssertionParameters): Chainable<Subject>
    }
}