Feature: Place order

    Background: Create a User Account
                Given I have the user details
                When I send a POST request to create the account
                Then I should receive the status code
                Given the user is on the login page
                Then the user enters valid credentials

        Scenario: Add two products to the cart and complete the order
            Given the user navigates to the products page
            When the user adds first product to the cart
            Given the user navigates to the products page
            When the user adds second product to the cart
            And proceeds to checkout and completes the order
            When the user fills in the payment details and confirms the order
            Then the order should be placed successfully and a success confirmation message should be displayed
            When I download the PDF file
            Then the PDF file size should be greater than 0 KB