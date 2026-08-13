const { defineConfig } = require('cypress')

module.exports = defineConfig({


  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      return config
      // implement node event listeners here
    },
  },
});
