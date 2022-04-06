
import { Given, Then,When } from 'cypress-cucumber-preprocessor/steps';

// const {
//     discountCheckBox
// } = require('../pages/BasePage');
const BasePage = require('../BasePage');
// var config = require('./../../wdio.conf.js').config;

/* Launch Web Application*/
Given('I launch web application', () => {
    cy.visit(Cypress.env('url'))
})

/* I refresh the Page*/
Given('I refresh the page', async () => {
    BasePage.refreshPage()
});

/* I place order for "No" quantity of "Book Name" "drama/book" at "price" dollars with a discount of "Discount%"*/
When('I place order for {int} quantity of {string} {string} at {int} dollars with a discount of {float}', (quantity, book, name, price, discount) => {
    BasePage.bookOrDrama(book, price, quantity, discount, name)
})

/* I wait for order details section to load*/
When('I wait for order details section to load', () => {
    BasePage.waitForOrderDetails()
});

/* I delete the existing record*/
When('I delete the existing record', () => {
    BasePage.deleteRecord()
});

/*I validate order details for "No" quantity of "Book name" book at "price" dollars with a discount of "Discount %"e*/
Then('I validate order details for {int} quantity of {string} book at {int} dollars with a discount of {float}', (quantity, name, price, discount) => {
    BasePage.validateOrderDetails(name, price, quantity, discount)
});


/* I validate the record is successfully deleted*/
Then('I validate the record is successfully deleted', () => {
    BasePage.validateRecordDeleted()
});