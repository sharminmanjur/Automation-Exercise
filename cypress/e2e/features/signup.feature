Feature: Create a User Account

  Scenario: Successfully create a user account
    Given I have the user details
    When I send a POST request to create the account
    Then I should receive the status code