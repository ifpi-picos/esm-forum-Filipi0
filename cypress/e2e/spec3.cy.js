describe('Teste E2E: Cadastro de resposta', () => {
  it('Deve cadastrar uma resposta para a primeira pergunta', () => {
    cy.visit('http://localhost:3000/');

    cy.get('a[href^="/respostas/?id_pergunta="]').first().click();

    cy.get('textarea[name="resposta"]').type('Resposta automática via Cypress');

    cy.get('input[type="submit"]').click();

    // Confirma que a resposta foi cadastrada
    cy.contains('Sua resposta foi cadastrada com sucesso.').should('exist');

    // Clica para voltar para a pergunta
    cy.get('a[href^="/respostas/?id_pergunta="]').first().click();

    // Agora espera a resposta aparecer
    cy.contains('Resposta automática via Cypress').should('exist');
  });
});
//