Cypress.Commands.add('Login', (email, password) => {
    cy.get('#user-name').type(email)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
})
