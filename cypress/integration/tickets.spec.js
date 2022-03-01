describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"))

    it("fills all the text input fields",()=>{
        let firstName = "Maycon"
        let lastname = "Queiroz"
        let quantity = "4"

        cy.get("#first-name").type(firstName)
        cy.get("#last-name").type(lastname)
        cy.get("#email")
        .as('email')
        .type("FFFFFF")
        cy.get("#email.invalid").should("exist")
        cy.get("@email").clear().type(`${firstName}.${lastname}@companymail.com`)
        cy.get("#email.invalid").should("not.exist")
        cy.get("#requests").type("lactose intolerance")
        cy.get("#signature").type(`${firstName} ${lastname}`)
        cy.get("#ticket-quantity").select(quantity)
        cy.get("#vip").check()
        let checkbox = ["social-media", "friend","publication","agree"]
        cy.get(`#${checkbox[1]}`).check()
        cy.get(`#${checkbox[2]}`).check()
        cy.get(`#${checkbox[1]}`).uncheck()
        cy.get(`#${checkbox[3]}`).check()
        cy.get("fieldset p")
        .should("contain", `I, ${firstName} ${lastname}, wish to buy ${quantity} VIP tickets. I understand that all ticket sales are final.`)
        cy.get("button[type='submit'")
        .as("submitButton")
        .should("not.be.disabled")
        cy.get("button[type='reset']").click()
        cy.get("@submitButton")
        .should("be.disabled")
    })

    it.only("fills mandatory fields using support commands",() =>{
        const customer = {
            firstName:"Maycon",
            lastName:"Queiroz",
            quantity:"3"
        }
        cy.fillMandatoryFields(customer)
        cy.get("button[type='submit'")
        .as("submitButton")
        .should("not.be.disabled")
        cy.get("#agree").uncheck()
        cy.get("@submitButton")
        .should("be.disabled")
    })
})  