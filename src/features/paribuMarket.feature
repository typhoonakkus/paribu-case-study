  Feature: Paribu Market Order Calculation

    Background:
      Given I open the Paribu homepage
      And I close the cookie notice

    Scenario: Verify total price calculation on third FAN crypto
      When I navigate to the Markets page
      And I filter by FAN
      And I set the price change timeframe to 12 hours
      And I select the third listed cryptocurrency
      And I enter the current price into the Unit Price field
      And I enter "quantity" as the quantity
      Then the Total Price should be correctly calculated
