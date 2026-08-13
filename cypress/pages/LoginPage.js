class LoginPage {

    get selectors() {
        return {
            username: '[data-test="username"]',
            password: '[data-test="password"]',
            loginButton: '[data-test="login-button"]',
            errorMessage: '[data-test="error"]'
        }
    }

    visit() {
        cy.visit('/')
        return this
    }
    
    login(username, password) {
        cy.get(this.selectors.username).clear().type(username)
        cy.get(this.selectors.password).clear().type(password, { log: false })
        cy.get(this.selectors.loginButton).click()
        return this
    }

}
export default new LoginPage()