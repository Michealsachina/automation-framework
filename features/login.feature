# features/login.feature

Feature: Login Functionality
  As a user
  I want to login to the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given user is on the login page
    When user enters valid email and password
    Then user should be redirected to homepage
    And logged in username should be visible

  Scenario: Failed login with invalid credentials
    Given user is on the login page
    When user enters invalid email and password
    Then error message should be displayed

  Scenario: Login with empty fields
    Given user is on the login page
    When user submits login form with empty fields
    Then user should remain on login page