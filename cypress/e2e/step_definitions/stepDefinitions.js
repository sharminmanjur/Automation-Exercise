/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I have the user details', () => {
  cy.wrap({
    name: "gucci",
    email: "gucci.prada@gmail.com",
    password: "password123",
    firstname: "gucci",
    lastname: "prada",
    address1: "123 Main St",
    address2: "Apt 4B",
    country: "USA",
    zipcode: "10001",
    state: "NY",
    city: "New York",
    mobile_number: "1234567890"
  }).as('userDetails');
});

When('I send a POST request to create the account', function() {
  const userDetails = this.userDetails;
  const formData = new URLSearchParams();
  
  Object.keys(userDetails).forEach(key => {
    formData.append(key, userDetails[key]);
  });

  cy.request({
    method: 'POST',
    url: 'https://automationexercise.com/api/createAccount',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  }).as('apiResponse');
});

Then('I should receive the status code', function() {
  cy.get('@apiResponse').then(response => {
  
    console.log('Full API Response:', response);

  
    expect(response.status).to.eq(200);
    expect(response.statusText).to.eq('OK');
  });
});


let credentials;
before(() => {
  cy.fixture('user_credentials').then((creds) => {
    credentials = creds;
  });
});

Given('the user is on the login page', () => {
  cy.visit('https://automationexercise.com/');
  cy.get('a[href="/login"]').click();
});

Then('the user enters valid credentials', function() {
  cy.get('input[data-qa="login-email"]').type(credentials.email);
  cy.get('input[data-qa="login-password"]').type(credentials.password);
  cy.get('button[data-qa="login-button"]').click();
});

Given('the user navigates to the products page', () => {
  cy.get('.shop-menu a[href="/products"]').click();
});


When('the user adds first product to the cart', () => {
  cy.get('a[href="/product_details/1"]').click();
  cy.get('button.cart').click();
  cy.get('button.btn.btn-success.close-modal.btn-block').click();

});

When('the user adds second product to the cart', () => {
  cy.get('a[href="/product_details/2"]').click();
  cy.get('button.cart').click();
  cy.get('button.btn.btn-success.close-modal.btn-block').click();
});

When('proceeds to checkout and completes the order', () => {
  cy.wait(2000);
  cy.get('.shop-menu ul.nav.navbar-nav li a[href="/view_cart"] i.fa-shopping-cart').click();
  cy.get('a.btn.btn-default.check_out').click();
  cy.get('a.btn.btn-default.check_out').click();
});

When('the user fills in the payment details and confirms the order', () => {
  cy.get('input[name="name_on_card"]').type('Gucci Prada');
  cy.get('input[name="card_number"]').type('4111 1111 1111 1111');
  cy.get('input[name="cvc"]').type('123');
  cy.get('input.card-expiry-month[placeholder="MM"]').type('12');
  cy.get('input.card-expiry-year[placeholder="YYYY"]').type('2026');

  cy.get('button#submit').click();

});

Then('the order should be placed successfully and a success confirmation message should be displayed', () => {
  cy.contains('Congratulations! Your order has been confirmed!');
});

When('I download the PDF file', () => {
 cy.get('a.check_out')
    .click();
});

Then('the PDF file size should be greater than 0 KB', () => {
  const filePath = 'cypress/downloads/invoice.txt';
  cy.readFile(filePath, 'binary').then((fileContents) => {
    const fileSizeInKB = fileContents.length / 1024;
    expect(fileSizeInKB).to.be.greaterThan(0);
});
});

Then('I should receive a success message', function() {
 cy.get('@apiResponse').then((response) => {
    
    const responseBody = JSON.parse(response.body);
    console.log('Parsed Response Body:', responseBody);

    expect(response.status).to.eq(200);
    expect(response.statusText).to.eq('OK');
    
    if(responseBody.responseCode === 201) {
      expect(responseBody).to.deep.include({
        responseCode: 201,
        message: 'User created!'
      });
    } else if (responseBody.responseCode === 400) {
      expect(responseBody).to.deep.include({
        responseCode: 400,
        message: 'Email already exists!'
      });
    }
  });
});