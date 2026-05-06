Cypress.Commands.add('Login', (email, password) => {
    cy.visit('/')
    cy.get('#user-name').type(email)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
})

Cypress.Commands.add('Login_Cookie', (user) => {
    cy.setCookie('session-username', user)
    cy.visit('/inventory.html', { failOnStatusCode: false })
});