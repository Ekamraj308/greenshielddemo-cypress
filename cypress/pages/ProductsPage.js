class ProductsPage {

  get url() {
    return '/inventory.html'
  }

  get selectors() {
    return {
      title: '[data-test="title"]',
      inventoryItem: '[data-test="inventory-item"]',
      itemName: '[data-test="inventory-item-name"]',
      cartBadge: '[data-test="shopping-cart-badge"]',
      cartLink: '[data-test="shopping-cart-link"]'
    }
  }

  addToCartButton(slug) {
    return `[data-test="add-to-cart-${slug}"]`
  }

  removeButton(slug) {
  return `[data-test="remove-${slug}"]`
  }

  visit() {
    cy.visit(this.url)
    return this
  }

  addToCart(slug) {
    cy.get(this.addToCartButton(slug)).click()
    return this
  }

  addMultipleToCart(slugs) {
    slugs.forEach((slug) => this.addToCart(slug))
    return this
  }

  goToCart() {
    cy.get(this.selectors.cartLink).click()
    return this
  }

  verifyLoaded() {
    cy.url().should('include', this.url)
    cy.get(this.selectors.title).should('have.text', 'Products')
    cy.get(this.selectors.inventoryItem).should('have.length', 6)
    return this
  }

  sortBy(optionValue) {
    cy.get('[data-test="product-sort-container"]').select(optionValue)
    return this
}

  getProductNames() {
    return cy.get('[data-test="inventory-item-name"]').then(($els) => {
      return Cypress._.map($els, (el) => el.innerText.trim())
  })
}

getProductPrices() {
  return cy.get('[data-test="inventory-item-price"]').then(($els) => {
    return Cypress._.map($els, (el) =>
      parseFloat(el.innerText.replace('$', ''))
    )
  })
}

  verifyButtonState(slug, expectedState) {
    if (expectedState === 'inCart') {
      cy.get(this.removeButton(slug)).should('be.visible')
      cy.get(this.addToCartButton(slug)).should('not.exist')
    } else if (expectedState === 'notInCart') {
      cy.get(this.addToCartButton(slug)).should('be.visible')
      cy.get(this.removeButton(slug)).should('not.exist')
    } else {
      throw new Error(`Invalid expectedState: ${expectedState}`)
    }
    return this
  }
}

export default new ProductsPage()