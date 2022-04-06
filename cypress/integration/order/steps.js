
import { Given, Then,When } from 'cypress-cucumber-preprocessor/steps';

/* Launch Web Application*/
Given('I launch web application', () => {
    cy.visit(Cypress.env('url'))
})

/* I place order for "No" quantity of "Book Name" "drama/book" at "price" dollars with a discount of "Discount%"*/
When('I place order for {int} quantity of {string} {string} at {int} dollars with a discount of {float}', (quantity, book, name, price, discount) => {
    // BasePage.bookOrDrama(book, price, quantity, discount, name)
    if (name === 'book') {
        cy.get('[type="radio"]').check('Fiction')
    } else if (name === 'drama'){
        cy.get('[type="radio"]').check('Drama')
    }
    cy.get('[class="bookoptions"]').select(book)
    cy.get('[name="units"]').type(quantity)
    cy.get('[name="price"]').type(price)
    cy.get('[type="checkbox"]').check()
    cy.get('[name="discountvalue"]').type(discount)
    cy.get('[type="submit"]').click()
})

/* I wait for order details section to load*/
When('I wait for order details section to load', () => {
    // we responded with one book the second time
    cy.get('td').contains('1')
});

/* I delete the existing record*/
When('I delete the existing record', () => {

    // OrderDetails Remove Record Button
    cy.get('[class="removeRecord"]').click()

    // Delete Record Pop Up Yes Button
    cy.get('#deletedialog').contains('Yes, Delete it!').click()
});

/*I validate order details for "No" quantity of "Book name" book at "price" dollars with a discount of "Discount %"e*/
Then('I validate order details for {int} quantity of {string} book at {int} dollars with a discount of {float}', (quantity, name, price, discount) => {
    // BasePage.validateOrderDetails(name, price, quantity, discount)
    let discountAmount = price * discount/100
    let totalDiscountAmount = discountAmount*quantity;
    let totalValue =quantity*price;
    let totalFinalAmount = totalValue - totalDiscountAmount;

    cy.get('#transactionsection').contains('1')
    cy.get('#transactionsection').contains(name)
    cy.get('#transactionsection').contains(price)
    cy.get('#transactionsection').contains(quantity)
    cy.get('#transactionsection').contains(totalValue)
    cy.get('#transactionsection').contains(totalDiscountAmount)
    cy.get('#transactionsection').contains(totalFinalAmount)
});


/* I validate the record is successfully deleted*/
Then('I validate the record is successfully deleted {int} quantity of {string} book at {int} dollars with a discount of {float}', (quantity, name, price, discount) => {
    // Validate all the Table exists in DOM
    cy.get('#transactionsection').should('have.length', 1)
    cy.get('#transactionsection').should('have.length', 1)
    cy.get('#transactionsection').should('have.length', 1)
    cy.get('#transactionsection').should('have.length', 1)
    cy.get('#transactionsection').should('have.length', 1)
    cy.get('#transactionsection').should('have.length', 1)
    cy.get('#transactionsection').should('have.length', 1)
    cy.get('#transactionsection').should('have.length', 1)

    let discountAmount = price * discount/100
    let totalDiscountAmount = discountAmount*quantity;
    let totalValue =quantity*price;
    let totalFinalAmount = totalValue - totalDiscountAmount;

    // Validate all text is not there
    cy.get('#transactionsection').should('not.have.text', '1')
    cy.get('#transactionsection').should('not.have.text', name)
    cy.get('#transactionsection').should('not.have.text', price)
    cy.get('#transactionsection').should('not.have.text', quantity)
    cy.get('#transactionsection').should('not.have.text', totalValue)
    cy.get('#transactionsection').should('not.have.text', totalDiscountAmount)
    cy.get('#transactionsection').should('not.have.text', totalFinalAmount)
});