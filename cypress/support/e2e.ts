// Cypress support file
// https://on.cypress.io/configuration#e2e

import './commands'

// Disable uncaught exception handling for development
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
