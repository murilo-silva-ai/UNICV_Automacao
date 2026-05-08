describe('Função de Compras', () => {
  it('Inserir item no carrinho com sucesso', () => {
    cy.Login_Cookie('standard_user')
    cy.contains('Sauce Labs Backpack').click()
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()

    cy.get('.shopping_cart_badge').should('contain.text', '1')
    cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Backpack')
  })

  it('Remover itens do carrinho', () => {
    cy.Login_Cookie('standard_user');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.visit('/cart.html', { failOnStatusCode: false })
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()

    cy.get('[data-test="inventory-item"]').should('not.exist')
  })

  it('Finalizar compra com sucesso', () => {
    cy.Login_Cookie('standard_user')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('.checkout_button').click()
    cy.get('#first-name').type('Murilo')
    cy.get('#last-name').type('Silva')
    cy.get('#postal-code').type('87025-530')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()

    cy.get('[data-test="complete-header"]').should('be.visible')
    cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html');
  });

  it('Retornar à tela de itens com sucesso', () => {
    cy.Login_Cookie('standard_user')
    cy.visit('/checkout-complete.html', { failOnStatusCode: false })
    cy.get('[data-test="back-to-products"]').click()

    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    cy.get('#inventory_container').should('be.visible')
  });

  it('Ordenar itens por preço - menor para maior', () => {
    cy.Login_Cookie('standard_user');
    cy.get('.product_sort_container').select('Price (low to high)')
    cy.get('.inventory_item_price').then(($precos) => {
      const preco_01_bruto = $precos.eq(0).text();
      const preco_02_bruto = $precos.eq(1).text();
      const preco_01 = parseFloat(preco_01_bruto.slice(1));
      const preco_02 = parseFloat(preco_02_bruto.slice(1));

      expect(preco_01).to.be.lessThan(preco_02);
    });
  });

  it('Ordenar itens por preço - maior para menor', () => {
    cy.Login_Cookie('standard_user');
    cy.get('.product_sort_container').select('Price (high to low)')
    cy.get('.inventory_item_price').then(($precos) => {
      const preco_01_bruto = $precos.eq(0).text();
      const preco_02_bruto = $precos.eq(1).text();
      const preco_01 = parseFloat(preco_01_bruto.slice(1));
      const preco_02 = parseFloat(preco_02_bruto.slice(1));

      expect(preco_01).to.be.greaterThan(preco_02);
    });
  });
})
