const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
    baseUrl: 'https://automationexercise.com',
    supportFile: 'cypress/support/index.js',
    specPattern: "cypress\e2e\features\purchase.feature",
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});