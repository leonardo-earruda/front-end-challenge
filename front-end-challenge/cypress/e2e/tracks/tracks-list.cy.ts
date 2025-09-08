describe('Tracks - Lista de ISRCs', () => {
  it('deve exibir a lista de ISRCs na página inicial', () => {
    cy.visit('/');
    cy.contains('h3', 'ISRCs').should('be.visible');
    cy.get('.card-content .title-secondary').should('have.length.greaterThan', 0);
  });
});


