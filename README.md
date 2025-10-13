![CI/CD](https://github.com/sharminmanjur/Automation-Exercise/actions/workflows/builspec.yml/badge.svg)

# Setup

```bash
1. npm init -y
```
```bash
2. npm install cypress --save-dev
```
```bash
3. npm install @bahmutov/cypress-esbuild-preprocessor @badeball/cypress-cucumber-preprocessor @shelex/cypress-allure-plugin --save-dev
```
```bash
5. npm install @shelex/cypress-allure-plugin cypress-xpath cypress-commands cypress-wait-until cypress-real-events --save-dev
```
```bash
6. npm i cypress-parallel
```
# Run

```bash
npx cypress open
```
<!-- In config file comment out specPattern respectively to run the scripts. /purchaseflow.feature is for task 1 and /API.feature is for task 2. Change the email in step definition: 'I have the user details' before running task 2-->

<!-- I have installed and configured allure report but wasn't able to run successfully. So below commands won't work-->

## Run

```bash
npm run cy:run
```

## Run and generate allure results
```bash
npm run cy:run:allure
```
## Run in parallel with allure results
```bash
npm run cy:parallel  
```
## See allure results
```bash
allure serve .\allure-results\ 
```