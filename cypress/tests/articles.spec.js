/// <reference types = "cypress"/>

import articles from '../support/pages/articles'
describe('Articles', () => {
  beforeEach (() => {
    cy.login()
    cy.visit('/')
  })

  it('Cadastro de articles com sucesso', () => {
    articles.acesssarFormulario()
    articles.preencherFormulario()
    articles.submeterFormulario()
    articles.verificarArtigoCriado()
  })
})
