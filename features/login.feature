Feature: Login API

  Scenario: Successful login
    Given the user credentials are prepared from the user list
    When the user logs in with the prepared credentials
    Then the login response should return status 200
    And the access token should be saved
  

  Scenario: Login with incorrect password
    When the user logs in with username "kminchelle" and password "wrongpass"
    Then the login response should return status 400
    And the error message should be "Invalid credentials"
