describe('Função de Compras', () => {
  it('Inserir item no carrinho com sucesso', () => {
    cy.Login_Cookie('standard_user')
    cy.contains('Sauce Labs Backpack').click()
    cy.get('#add-to-cart').click()

    cy.get('.shopping_cart_badge').should('contain.text', '1')
    cy.contains('Sauce Labs Backpack').should('be.visible')
  })
})
