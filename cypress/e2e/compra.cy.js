describe('Função de Compras', () => {
  it('Buscar por item existente', () => {
    cy.cadastraUsuario('Murilo', 'murilo@gmail.com', '123456', 'false')
    cy.login_api('murilo@gmail.com', '123456', '/home')
    cy.get('[data-testid="pesquisar"]').type('Logitech MX Vertical')
    cy.get('[data-testid="botaoPesquisar"]').click()

    cy.get('.card-body').should('have.length', 1);
    cy.contains('Logitech MX Vertical').should('be.visible')
  })

  it('Pesquisar por itens mockados', () => {
    const itens = require('../fixtures/mock_itens')
    cy.login_api('murilo@gmail.com', '123456', '/home')
    cy.get('[data-testid="pesquisar"]').type('Logitech')
    cy.intercept(
      'GET',
      'https://serverest.dev/produtos?nome=Logitech',
      { fixture: 'mock_itens' }
    ).as('getItens')
    cy.get('[data-testid="botaoPesquisar"]').click()

    cy.get('.card-body').should('have.length', 4);
    cy.deleteUsuario('murilo@gmail.com')
  })
})
