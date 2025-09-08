describe('Shared - Modal de indisponibilidade', () => {
  it('deve abrir modal quando não houver resultados para um ISRC', () => {
    cy.intercept('GET', '**/v1/search*isrc:QZNJX2078148*', {
      statusCode: 200,
      body: { tracks: { items: [] } },
    }).as('searchEmpty');

    cy.visit('/');
    cy.contains('.card-content .title-secondary', 'QZNJX2078148').click();
    cy.wait('@searchEmpty');

    cy.contains('.modal-title', 'Faixa indisponível').should('be.visible');
    cy.contains('.modal-body', 'Não foi encontrado detalhes').should('be.visible');
    cy.contains('.modal-btn', 'OK').click();
  });
});


