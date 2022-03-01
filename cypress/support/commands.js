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

Cypress.Commands.add("fillMandatoryFields", data=>{
    const {firstName, lastName, quantity} = data
    cy.get("#first-name").type(firstName)
    cy.get("#last-name").type(lastName)
    cy.get("#email")
    .as('email')
    .type("FFFFFF")
    cy.get("#email.invalid").should("exist")
    cy.get("@email").clear().type(`${firstName}.${lastName}@companymail.com`)
    cy.get("#email.invalid").should("not.exist")
    cy.get("#requests").type("lactose intolerance")
    cy.get("#signature").type(`${firstName} ${lastName}`)
    cy.get("#ticket-quantity").select(quantity)
    cy.get("#vip").check()
    let checkbox = ["social-media", "friend","publication","agree"]
    cy.get(`#${checkbox[1]}`).check()
    cy.get(`#${checkbox[2]}`).check()
    cy.get(`#${checkbox[1]}`).uncheck()
    cy.get(`#${checkbox[3]}`).check()
})