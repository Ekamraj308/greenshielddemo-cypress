import ProductsPage from '../pages/ProductsPage'
import LoginPage from '../pages/LoginPage'

describe('Product Sorting', () => {

  beforeEach(() => {
    cy.fixture('users').then((users) => {
      LoginPage.visit()
      LoginPage.login(users.standard.username, users.standard.password)
    })
  })

  it('sorts products by Name A to Z', () => {
    ProductsPage.sortBy('az')

    ProductsPage.getProductNames().then((names) => {
      const sorted = [...names].sort((a, b) => a.localeCompare(b))
      expect(names).to.deep.equal(sorted)
    })
  })

  it('sorts products by Name Z to A', () => {
    ProductsPage.sortBy('za')

    ProductsPage.getProductNames().then((names) => {
      const sorted = [...names].sort((a, b) => b.localeCompare(a))
      expect(names).to.deep.equal(sorted)
    })
  })

  it('sorts products by Price low to high', () => {
    ProductsPage.sortBy('lohi')

    ProductsPage.getProductPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b)
      expect(prices).to.deep.equal(sorted)
    })
  })

  it('sorts products by Price high to low', () => {
    ProductsPage.sortBy('hilo')

    ProductsPage.getProductPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => b - a)
      expect(prices).to.deep.equal(sorted)
    })
  })

  it('defaults to Name A to Z on page load', () => {
    cy.get('[data-test="active-option"]')
      .should('have.text', 'Name (A to Z)')

    ProductsPage.getProductNames().then((names) => {
      const sorted = [...names].sort((a, b) => a.localeCompare(b))
      expect(names).to.deep.equal(sorted)
    })
  })

})