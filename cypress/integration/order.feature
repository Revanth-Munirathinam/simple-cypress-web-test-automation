Feature: As a wholesale customer, I should be able to place order 
@order @smoke

Scenario: As a wholesale customer, I should be able to order 50 Harry Potter fiction books at a rate of $35.80 each so that I can sell them to my customers.
  Given I launch web application
  When I place order for 50 quantity of "Harry Potter" "book" at 50 dollars with a discount of 28.4
    And I wait for order details section to load
  Then I validate order details for 50 quantity of "Harry Potter" book at 50 dollars with a discount of 28.4

Scenario: As a book lover, I should be able to order a drama called “The Rainbow” for no more than $125.00 I also want to use my 10% discount voucher so that I can send this book to my mom.
  Given I launch web application
  When I place order for 1 quantity of "The Rainbow" "drama" at 124 dollars with a discount of 10.0
    And I wait for order details section to load
  Then I validate order details for 1 quantity of "The Rainbow" book at 124 dollars with a discount of 10.0
  When I delete the existing record
  Then I validate the record is successfully deleted 1 quantity of "The Rainbow" book at 124 dollars with a discount of 10.0