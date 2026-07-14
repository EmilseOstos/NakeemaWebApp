// Custom commands for Cypress
// https://on.cypress.io/custom-commands

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('http://localhost:3000')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('checkElement', (selector: string) => {
  cy.get(selector).should('exist')
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      checkElement(selector: string): Chainable<void>
    }
  }
}

export {}
