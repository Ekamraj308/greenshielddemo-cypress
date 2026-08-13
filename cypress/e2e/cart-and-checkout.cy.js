import CartPage from '../pages/CartPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import CheckoutPage from '../pages/CheckoutPage'

describe('Cart and Order Workflow', () => {

  let checkoutData

  before(() => {
  cy.fixture('checkout').then((data) => {
    checkoutData = data
  })
})

  beforeEach(() => {
    cy.fixture('users').then((users) => {
    LoginPage.visit()
    LoginPage.login(users.standard.username, users.standard.password)
  })
})

it('completes the cart workflow', () => {
  cy.fixture('products').then((products) => {
    const { bikeLight, boltTShirt, onesie, backpack, fleeceJacket, redTShirt } = products
    
    // Requirement 2: add three items
    ProductsPage.addMultipleToCart([bikeLight.slug, boltTShirt.slug, onesie.slug])
    cy.get(ProductsPage.selectors.cartBadge).should('have.text', '3')

    // Requirement 3: go to cart, verify contents
    ProductsPage.goToCart()
    CartPage.verifyLoaded()
    CartPage.verifyCartContents([bikeLight.name, boltTShirt.name, onesie.name])

    // Requirement 4: navigate to Onesie's page via link in cart
    CartPage.openProductDetail(onesie.name)
    ProductDetailPage.verifyLoaded(onesie.name)

    // Requirement 5: remove Onesie from its product detail page
    ProductDetailPage.removeFromCart()

    // Requirement 6: back to Products page, verify button state for each product
    ProductDetailPage.backToProducts()

    ProductsPage.verifyButtonState(bikeLight.slug, 'inCart')
    ProductsPage.verifyButtonState(boltTShirt.slug, 'inCart')
    ProductsPage.verifyButtonState(onesie.slug, 'notInCart')
    ProductsPage.verifyButtonState(backpack.slug, 'notInCart')
    ProductsPage.verifyButtonState(fleeceJacket.slug, 'notInCart')
    ProductsPage.verifyButtonState(redTShirt.slug, 'notInCart')

    cy.get(ProductsPage.selectors.cartBadge).should('have.text', '2')

    // Requirement 7: back to cart, verify contents again
    ProductsPage.goToCart()
    CartPage.verifyLoaded()
    CartPage.verifyCartContents([bikeLight.name, boltTShirt.name])

    // Requirement 8: complete the order workflow
    CartPage.checkout()
    CheckoutPage.verifyStepOneLoaded()

    CheckoutPage.fillCustomerInfo(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    )
    CheckoutPage.continueToOverview()
    CheckoutPage.verifyOverviewLoaded()

    CheckoutPage.finishOrder()
    CheckoutPage.verifyOrderComplete()

    // Final assertion: back on Products page in its default state
    CheckoutPage.backToProducts()
    ProductsPage.verifyLoaded()
    cy.get(ProductsPage.selectors.cartBadge).should('not.exist')
  })
})

})