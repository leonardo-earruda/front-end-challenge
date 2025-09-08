describe('Tracks - Link de voltar', () => {
  it('deve voltar para /tracks ao clicar no link voltar', () => {
    cy.intercept('GET', '**/v1/search*isrc:US7VG1846811*', { fixture: 'search_one_track_br.json' }).as('one');

    cy.visit('/');
    cy.contains('.card-content .title-secondary', 'US7VG1846811').click();
    cy.wait('@one');

    cy.contains('a', '← Voltar').click();
    cy.url().should('match', /\/tracks(?!\/details)/);
    cy.contains('h3', 'ISRCs').should('be.visible');
  });
});


