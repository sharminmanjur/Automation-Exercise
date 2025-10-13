Feature: Create a User Account API

  Scenario: Successfully create a user account with provided API request
    Given I have the user details
    When I send a POST request to create the account
    Then I should receive a success message