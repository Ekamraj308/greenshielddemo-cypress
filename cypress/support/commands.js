Cypress.Commands.add('programmaticLogin', (username = 'standard_user') => {
  cy.session(username, () => {
    cy.visit('/')
    cy.setCookie('session-username', username)
  })
})