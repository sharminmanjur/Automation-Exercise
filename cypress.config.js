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
    //specPattern: "cypress/e2e/features/signup.feature",
    //specPattern: "cypress/e2e/features/login.feature",
    specPattern: "cypress/e2e/features/purchaseflow.feature",
  },
});