describe('Tracks - Details All', () => {
  it('deve carregar todas as faixas ao acessar /tracks/details/all', () => {
    cy.intercept('GET', '**/v1/search*isrc*', { fixture: 'search_one_track_br.json' }).as('searchAny');

    cy.visit('/tracks/details/all');

    cy.contains('h3', 'Faixas').should('be.visible');
    cy.get('.card-blue').should('have.length.greaterThan', 0);
  });
});


