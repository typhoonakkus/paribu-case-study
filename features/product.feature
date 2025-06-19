Feature: Product Operations

  Scenario: Get products with a limit and check array length
    Given the user has a valid token
    When the user requests 5 products from the product list
    Then the product list should contain 5 items

  Scenario: Update and delete the first product
    Given the user has a valid token
    When the user updates the name of the first product
    Then the response status should be 200
    When the user deletes the updated product
    Then the delete response should be 200


