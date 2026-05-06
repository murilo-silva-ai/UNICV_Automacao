describe('Tela de Login', () => {
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

  it('Login sem sucesso, sem credenciais', () => {
    cy.visit('/')
    cy.get('[data-test="login-button"]').click()

    cy.get('[class="error-message-container error"]').should('be.visible')
  })

  it('LogOut com sucesso', () => {
    cy.Login_Cookie('standard_user')
    cy.get('#react-burger-menu-btn').click()
    cy.get('[data-test="logout-sidebar-link"]').click()

    cy.get('[data-test="login-container"]')
    cy.url().should('eq', 'https://www.saucedemo.com/');
  })
})
