describe('Cadastro de usuário', () => {
    it('Cadastro de usuário regular com sucesso', () => {
        cy.intercept('POST', '**/usuarios').as('Cadastro_Usuario')
        cy.visit('/cadastrarusuarios')
        cy.get('[data-testid="nome"]').type('Murilo Vinicius Silva')
        cy.get('[data-testid="email"]').type('murilo@gmail.com.br')
        cy.get('[data-testid="password"]').type('teste123')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()

        cy.wait('@Cadastro_Usuario').its('response.statusCode').should('eq', 201)
        cy.contains('a', 'Cadastro realizado com sucesso').should('be.visible')
        cy.ehAdm('sim')
    })

    it('Cadastro de usuário regular com sucesso', () => {
        cy.intercept('POST', '**/usuarios').as('Cadastro_Usuario')
        cy.visit('/cadastrarusuarios')
        cy.get('[data-testid="nome"]').type('Murilo Vinicius Silva')
        cy.get('[data-testid="email"]').type('murilo123@gmail.com.br')
        cy.get('[data-testid="password"]').type('teste123')
        cy.get('[data-testid="checkbox"]').uncheck()
        cy.get('[data-testid="cadastrar"]').click()

        cy.wait('@Cadastro_Usuario').its('response.statusCode').should('eq', 201)
        cy.contains('a', 'Cadastro realizado com sucesso').should('be.visible')
        cy.ehAdm('nao')
    })

    it('Cadastro sem sucesso - sem credenciais fornecidas', () => {

    })

    it('Cadastro sem sucesso - usuário já cadastrado', () => {

    })
})
