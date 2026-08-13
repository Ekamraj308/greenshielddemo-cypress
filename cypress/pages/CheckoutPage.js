class CheckoutPage {

  get urls() {
    return {
      stepOne: '/checkout-step-one.html',
      stepTwo: '/checkout-step-two.html',
      complete: '/checkout-complete.html'
    }
  }

  get selectors() {
    return {
      firstName: '[data-test="firstName"]',
      lastName: '[data-test="lastName"]',
      postalCode: '[data-test="postalCode"]',
      continueButton: '[data-test="continue"]',
      finishButton: '[data-test="finish"]',
      completeHeader: '[data-test="complete-header"]',
      backHomeButton: '[data-test="back-to-products"]'
    }
  }

  fillCustomerInfo(firstName, lastName, postalCode) {
    cy.get(this.selectors.firstName).clear().type(firstName)
    cy.get(this.selectors.lastName).clear().type(lastName)
    cy.get(this.selectors.postalCode).clear().type(postalCode)
    return this
  }

  continueToOverview() {
    cy.get(this.selectors.continueButton).click()
    return this
  }

  finishOrder() {
    cy.get(this.selectors.finishButton).click()
    return this
  }

  backToProducts() {
    cy.get(this.selectors.backHomeButton).click()
    return this
  }

  verifyStepOneLoaded() {
    cy.url().should('include', this.urls.stepOne)
    return this
  }

  verifyOverviewLoaded() {
    cy.url().should('include', this.urls.stepTwo)
    return this
  }

  verifyOrderComplete() {
    cy.url().should('include', this.urls.complete)
    cy.get(this.selectors.completeHeader)
      .should('be.visible')
      .and('have.text', 'Thank you for your order!')
    return this
  }

}

export default new CheckoutPage()