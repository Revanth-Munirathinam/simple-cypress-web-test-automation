const chai = require('chai');
chai.Assertion.addProperty('visible', require('chai-visible'));
const expect = chai.expect;

class BasePage {

    // Fiction Radio Button
    get fictionRadioButton() {
        return $('#radioselect1')
    }
    // Book Radio Button
    get bookRadioButton() {
        return $('input[value="Fiction"]')
    }
    // Submit Button
    get submitButton() {
        return $('input[type="submit"]')
    }
    // Discount CheckBox Button
    get discountCheckBox() {
        return $('input[type="checkbox"]')
    }
    // Book DropDown
    get selectBook() {
        return $('select[class="bookoptions"]')
    }
    // Quantity TextBox
    get units() {
        return $('input[name="units"]')
    }
    // Price TextBox
    get price() {
        return $('input[name="price"]')
    }
    // OrderDetails Table
    get orderDetails() {
        return $('//td[text()="1"]')
    }
    // Discount CheckBox
    get discountValue() {
        return $('input[name="discountvalue"]')
    }
    // OrderDetails Sl No
    get orderDetailsSlNo() {
        return $('//table[@id="transactionsection"]/tr/td[1]')
    }
    // OrderDetails Book Name
    get orderDetailsBookName() {
        return $('//table[@id="transactionsection"]/tr/td[2]')
    }
    // OrderDetails Quantity
    get orderDetailsUnit() {
        return $('//table[@id="transactionsection"]/tr/td[3]')
    }
    // OrderDetails Total Price
    get orderDetailsPrice() {
        return $('//table[@id="transactionsection"]/tr/td[4]')
    }
    // OrderDetails Remove Record Button
    get orderDetailsRemoveRecord() {
        return $('span[class="removeRecord"]')
    }
    // OrderDetails Total Price Before Discount
    get orderDetailsTotalValue() {
        return $('//table[@id="transactionsection"]/tr/td[5]')
    }
    // OrderDetails Total Discount Price 
    get orderDetailsDiscountValue() {
        return $('//table[@id="transactionsection"]/tr/td[6]')
    }
    // OrderDetails Total Final Price 
    get orderDetailsFinalValue() {
        return $('//table[@id="transactionsection"]/tr/td[7]')
    }
    // Delete Record Pop Up
    get deleteRecordPopUp() {
        return $('#deletedialog')
    }
    // Delete Record Pop Up Yes Button
    get deleteRecordYesButton() {
        return $('//div[@id="deletedialog"]//button[text()="Yes, Delete it!"]')
    }
    // Delete Record Pop Up No Button
    get deleteRecordNoButton() {
        return $('//div[@id="deletedialog"]//button[text()="No"]')
    }

    /* Place Order for Book Or Drama
    parameters BookName, Price, Quantity, Discount, Type
    */
    async bookOrDrama(bookName, price, quantity, discount, type) {
        if (type === 'book') {
            cy.get(this.fictionRadioButton).click()
        } else {
            cy.get(this.bookRadioButton).click()
        }
        cy.get(this.selectBook).click()
        cy.select(this.selectBook, bookName)
        cy.get(this.units).type(quantity)
        cy.get(this.price).type(price)
        cy.get(this.discountCheckBox).click()
        cy.get(this.discountValue).type(discount)
        cy.get(this.submitButton).click()
    }

    /* Wait for Order Details Section to Display
    */
    async waitForOrderDetails() {
        // we responded with one book the second time
        cy.get(this.orderDetails).should('have.length', 1)
    }

    /* Validate Order Details for Book Or Drama
    parameters BookName, Price, Quantity, Discount
    */
    async validateOrderDetails(bookName, price, quantity, discount) {
        let discountAmount = price * discount/100
        let totalDiscountAmount = discountAmount*quantity;
        let totalValue =quantity*price;
        let totalFinalAmount = totalValue - totalDiscountAmount;
        console.log('Discount ' + discountAmount);
        console.log('Total Value ' + totalValue);
        console.log('Total Discount ' + totalDiscountAmount);
        console.log('Total Final Amount ' + totalFinalAmount);

        cy.get(this.orderDetailsSlNo).should('have.text', '1')
        cy.get(this.orderDetailsBookName).should('have.equal', bookName)
        cy.get(this.orderDetailsPrice).should('have.text', price)
        cy.get(this.orderDetailsUnit).should('have.equal', quantity)
        cy.get(this.orderDetailsTotalValue).should('have.equal', totalValue)
        cy.get(this.orderDetailsDiscountValue).should('have.equal', totalDiscountAmount)
        cy.get(this.orderDetailsFinalValue).should('have.equal', totalFinalAmount)
    }

    /* I refresh the page and validate the url
    */
    async refreshPage() {
        cy.reload()
        cy.url().should('have.equal', 'https://react.simprocloud.com/build/index.html');
    }

    /* I delete record in the table
    */
    async deleteRecord() {


        // Click on Remove Record button
        cy.get(this.orderDetailsRemoveRecord).click()

        // Click on Yes Button
        cy.get(this.deleteRecordYesButton).click()
    }

    /* I Validate record is successfully deleted
    */
    async validateRecordDeleted() {
        // Validate all the elements exists in DOM
        cy.get(this.orderDetailsRemoveRecord).should('have.length', 1)
        cy.get(this.orderDetailsSlNo).should('have.length', 1)
        cy.get(this.orderDetailsBookName).should('have.length', 1)
        cy.get(this.orderDetailsPrice).should('have.length', 1)
        cy.get(this.orderDetailsUnit).should('have.length', 1)
        cy.get(this.orderDetailsTotalValue).should('have.length', 1)
        cy.get(this.orderDetailsDiscountValue).should('have.length', 1)
        cy.get(this.orderDetailsFinalValue).should('have.length', 1)

        // Validate all fields is empyt
        cy.get(this.orderDetailsSlNo).should('have.text', '')
        cy.get(this.orderDetailsBookName).should('have.equal', '')
        cy.get(this.orderDetailsPrice).should('have.text', '')
        cy.get(this.orderDetailsUnit).should('have.equal', '')
        cy.get(this.orderDetailsTotalValue).should('have.equal', '')
        cy.get(this.orderDetailsDiscountValue).should('have.equal', '')
        cy.get(this.orderDetailsFinalValue).should('have.equal', '')
    }
}

module.exports = new BasePage();