Feature: Place order

    Background: Login with valid credentials
                Given the user is on the login page
                Then the user enters valid credentials

        Scenario: Add two products to the cart and complete the order
            Given the user navigates to the products page
            When the user adds first product to the cart
            Given the user navigates to the products page
            When the user adds second product to the cart
            And proceeds to checkout and completes the order