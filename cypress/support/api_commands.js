Cypress.Commands.add('ehAdm', (usuario, email, adm) => {
    cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios',
        qs: {
            nome: usuario,
            email: email
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        var administrador_response = response.body.usuarios[0].administrador

        if (adm === 'sim') {
            expect(administrador_response).to.be.equal('true')
        } else {
            expect(administrador_response).to.be.equal('false')
        }
    })
})

Cypress.Commands.add('cadastraUsuario', (nome, email, senha, administrador) => {
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: {
            nome: nome,
            email: email,
            password: senha,
            administrador: administrador
        }
    })
})

Cypress.Commands.add('deleteUsuario', (email) => {
    cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios',
        qs: {
            email: email
        }
    }).then((response) => {
        cy.request({
            method: 'DELETE',
            url: `https://serverest.dev/usuarios/${response.body.usuarios[0]._id}`,
        })
    })
})

Cypress.Commands.add('login_api', (email, senha, tela) => {
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
            email: email,
            password: senha
        }
    }).then((response) => {
        window.localStorage.setItem('serverest/userToken', response.body.authorization)
    })
    cy.visit(`/${tela}`)
})