describe('Tela de Login', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('Login com sucesso', () => {
    cy.Login('standard_user', 'secret_sauce')

    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    cy.get('#inventory_container').should('be.visible')
  })

  it('Login sem sucesso, usuário incorreto', () => {
    cy.Login('wrong_user', 'wrong_sauce')

    cy.contains('h3', 'Username and password do not match any user in this service')
    cy.get('[class="error-message-container error"]')
  })
})
