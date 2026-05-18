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