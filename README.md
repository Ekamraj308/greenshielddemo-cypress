# GreenShield QA Automation Assignment

Cypress test suite built for https://www.saucedemo.com

## How to run

```bash
npm install
npx cypress open
```

## Dependencies

Everything needed is listed in `package.json`. Running `npm install` 
pulls in Cypress and its supporting packages automatically — 
`node_modules` isn't included in this repo since it's large and 
gets regenerated from `package.json` on install.

Main dependency: Cypress 15.20.1


Then click the spec file you want to run in the Cypress window.

## What's in here

**Test Case #1** `cypress/e2e/cart-and-checkout.cy.js`
Covers the full cart and checkout workflow. Adds three items, removes one 
via the product detail page, verifies button states across all six products, 
and completes the order through to confirmation. 

Also includes a test that checks checkout is blocked and an error shows up 
when the customer info form is submitted empty.

**Test Case #2** `cypress/e2e/product-sorting.cy.js`
Tests all four sort options on the Products page name A-Z, name Z-A, 
price low to high, price high to low, plus confirms the default sort on  
page load. The A-Z test sorts Z-A first, captures that order, then sorts 
A-Z and captures again. 

It asserts the second order is correctly A-Z, and separately asserts 
it's different from the first capture, so the test can only pass if the
sort genuinely changed something, not just because the page happened to 
load in A-Z order already.

## A few things I would mention-

**Requirement comments:** Each step in cart-and-checkout.cy.js has a 
comment linking it back to the numbered requirement, for example 
"// Requirement 3: go to cart, verify contents". This makes it easy 
to trace which code covers which requirement without hunting through 
the file.

**The T-shirt name:** Requirement 2b says "Sauce Labs Bold T-Shirt" but 
the actual product on the site is "Sauce Labs Bolt T-Shirt". Treated as 
a typo and tested against the real product name.

**Login:** I used UI login, since this is a small suite and it also 
exercises the real login form as a side effect.

**Selectors:** Everything uses data-test attributes, confirmed by 
inspecting the real DOM rather than guessing. Products page uses 
slug-based selectors since each button is named after its product.

**Sorting assertions:** Prices are parsed as numbers before comparing 
string comparison of "$9.99" vs "$49.99" gives the wrong order since it 
compares character by character.

**Default state (Requirement 8):** The requirement says "default state" 
without defining it. I interpreted that as correct page, all six 
products visible, cart badge gone, every button reading "Add to cart".
