class ProductDetailPage {

  get selectors() {
    return {
      name: '[data-test="inventory-item-name"]'
    }
  }

  get removeButton() {
  return '[data-test="remove"]'
  }

  removeFromCart() {
  cy.get(this.removeButton).click()
  return this
  }

  get backButton() {
  return '[data-test="back-to-products"]'
  }

  backToProducts() {
  cy.get(this.backButton).click()
  return this
  }

  verifyLoaded(productName) {
    cy.url().should('include', '/inventory-item.html')
    cy.get(this.selectors.name).should('have.text', productName)
    return this
  }

}

export default new ProductDetailPage()