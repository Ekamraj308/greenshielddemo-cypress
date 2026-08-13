class CartPage {

  get url() {
    return '/cart.html'
  }

  get selectors() {
    return {
      title: '[data-test="title"]',
      cartItem: '[data-test="inventory-item"]',
      itemName: '[data-test="inventory-item-name"]',
      checkoutButton: '[data-test="checkout"]'
    }
  }

  visit() {
    cy.visit(this.url)
    return this
  }

  openProductDetail(productName) {
    cy.contains(this.selectors.itemName, productName).click()
    return this
  }

  checkout() {
    cy.get(this.selectors.checkoutButton).click()
    return this
  }

  verifyLoaded() {
    cy.url().should('include', this.url)
    cy.get(this.selectors.title).should('have.text', 'Your Cart')
    return this
  }

  verifyCartContents(expectedNames) {
    cy.get(this.selectors.cartItem).should('have.length', expectedNames.length)

    cy.get(this.selectors.itemName).then(($els) => {
      const actual = Cypress._.map($els, (el) => el.innerText.trim())
      expect(actual.sort()).to.deep.equal([...expectedNames].sort())
    })
    return this
  }

}

export default new CartPage()