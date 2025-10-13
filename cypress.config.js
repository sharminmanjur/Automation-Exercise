const {Cypress} = require("cypress");
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
});
      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);

      on("task", {
        log(args) {
          console.log(...args);
          console.log();
          return null;
    }
  });

      return config;
    },
    downloadsFolder: 'cypress/downloads',
    video: false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    viewportWidth: 1280,
    viewportHeight: 720,
    //specPattern: "cypress/e2e/features/signup.feature",
    //specPattern: "cypress/e2e/features/API.feature",
    specPattern: "cypress/e2e/features/purchaseflow.feature",
  },
});