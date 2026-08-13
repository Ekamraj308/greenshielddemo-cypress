import LoginPage from '../pages/LoginPage'

describe('Login', () => {

  it('logs in successfully with standard_user', () => {
    cy.fixture('users').then((users) => {
      LoginPage.visit()
      LoginPage.login(users.standard.username, users.standard.password)

      cy.url().should('include', '/inventory.html')
    })
  })

})