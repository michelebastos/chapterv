/// <reference types = "cypress" />

describe('Validar cadastro', () => {
  it('Cadastro com sucesso', () => {
    cy.intercept({

      method: 'POST',
      path: '/api/users'
    }, {
      statusCode: 200,
      fixture: 'cadastro-com-sucesso'

    }).as('postUsers')

    cy.visit('register')
    cy.get('[placeholder="Username"]').type('TestUsername123')
    cy.get('[placeholder="Email"]').type('TestUsername123@gmail.com')
    cy.get('[placeholder="Password"]').type('TestUsername12356')
    cy.get('button.btn-primary').click()

    cy.contains('No articles are here... yet').should('be.visible')   
  });
    

  it('Cadastro com email existente', () => {
    cy.intercept({

      method: 'POST',
      path: '/api/users'
    }, {
      statusCode: 422,
      fixture: 'cadastro-email-existente'

    }).as('postUsers')
    cy.visit('register')
    cy.get('[placeholder="Username"]').type('TestUsername')
    cy.get('[placeholder="Email"]').type('midsa.cardoso@gmail.com')
    cy.get('[placeholder="Password"]').type('TestPass123')

    cy.get('button.btn-primary').click()
    cy.contains('email has already been taken').should('be.visible')
  });

  it('Cadastro com usuário existente', () => {
    cy.intercept({

      method: 'POST',
      path: '/api/users'
    }, {
      statusCode: 422,
      fixture: 'cadastro-usuario-existente'

    }).as('postUsers')
    cy.visit('register')
    cy.get('[placeholder="Username"]').type('TestUsername12356')
    cy.get('[placeholder="Email"]').type('midsa.cardoso@gmail.com')
    cy.get('[placeholder="Password"]').type('TestPass123')
    cy.get('button.btn-primary').click()

    cy.contains('username has already been taken').should('be.visible')
  })

  it('Cadastro com usuário nulo', () => {
    cy.intercept({

      method: 'POST',
      path: '/api/users'
    }, {
      statusCode: 422,
      fixture: 'cadastro-usuario-nulo'

    }).as('postUsers')
    cy.visit('register')
    cy.get('[placeholder="Username"]').type('TestUsername')
    cy.get('[placeholder="Email"]').type('midsa.cardoso@gmail.com')
    cy.get('[placeholder="Password"]').type('TestPass123')

    cy.get('button.btn-primary').click()
    cy.contains("username can't be blank").should('be.visible')
  })

  it.only('Cadastro com email nulo', () => {
    cy.intercept({

      method: 'POST',
      path: '/api/users'
    }, {
      statusCode: 422,
      fixture: 'cadastro-email-nulo'

    }).as('postUsers')
    cy.visit('register')
    cy.get('[placeholder="Username"]').type('TestUsername')
    cy.get('[placeholder="Email"]').type('midsa.cardoso@gmail.com')
    cy.get('[placeholder="Password"]').type('TestPass123')

    cy.get('button.btn-primary').click()
    cy.contains("email can't be blank").should('be.visible')
  })
})
