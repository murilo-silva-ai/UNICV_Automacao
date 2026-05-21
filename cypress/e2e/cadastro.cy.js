describe('Cadastro de usuário', () => {
    it('Cadastro de usuário regular com sucesso', () => {
        cy.visit('/cadastrarusuarios')
        cy.get('[data-testid="nome"]').type('Murilo Silva')
        cy.get('[data-testid="email"]').type('murilo_reg@gmail.com.br')
        cy.get('[data-testid="password"]').type('teste123')
        cy.get('[data-testid="checkbox"]').uncheck()
        cy.get('[data-testid="cadastrar"]').click()

        cy.contains('a', 'Cadastro realizado com sucesso', { timeout: 6000 }).should('be.visible')
        cy.ehAdm('Murilo Silva', 'murilo_reg@gmail.com.br', 'nao')

        cy.deleteUsuario('murilo_reg@gmail.com.br')
    })

    it('Cadastro de usuário adm com sucesso', () => {
        cy.visit('/cadastrarusuarios')
        cy.get('[data-testid="nome"]').type('Murilo Silva')
        cy.get('[data-testid="email"]').type('murilo_admin@gmail.com.br')
        cy.get('[data-testid="password"]').type('teste123')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()

        cy.contains('a', 'Cadastro realizado com sucesso').should('be.visible')
        cy.ehAdm('Murilo Silva', 'murilo_admin@gmail.com.br', 'sim')

        cy.deleteUsuario('murilo_admin@gmail.com.br')
    })

    it('Cadastro sem sucesso - sem credenciais fornecidas', () => {
        cy.intercept('POST', '**/usuarios').as('Cadastro_Usuario')
        cy.visit('/cadastrarusuarios')
        cy.get('[data-testid="cadastrar"]').click()

        cy.contains('Nome é obrigatório').should('be.visible')
        cy.contains('Email é obrigatório').should('be.visible')
        cy.contains('Password é obrigatório').should('be.visible')
        cy.wait('@Cadastro_Usuario').its('response.statusCode').should('eq', 400)
    })

    it('Cadastro sem sucesso - usuário já cadastrado', () => {
        cy.visit('/cadastrarusuarios')
        cy.get('[data-testid="nome"]').type('Murilo Vinicius Silva')
        cy.get('[data-testid="email"]').type('murilo@gmail.com.br')
        cy.get('[data-testid="password"]').type('teste123')
        cy.intercept('POST', '**/usuarios', {
            statusCode: 400,
            body: {
                message: 'Usuário já cadastrado'
            }
        })
        cy.get('[data-testid="cadastrar"]').click()

        cy.get('.alert-dismissible').should('contain', 'Usuário já cadastrado')
    })
})
