describe('Tracks - Link externo Spotify', () => {
  it('deve exibir link para o Spotify no card de detalhes', () => {
    cy.intercept('GET', '**/v1/search*isrc:US7VG1846811*', { fixture: 'search_one_track_br.json' }).as('one');

    cy.visit('/');
    cy.contains('.card-content .title-secondary', 'US7VG1846811').click();
    cy.wait('@one');

    cy.contains('a', 'Abrir no Spotify')
      .should('have.attr', 'href')
      .and('include', 'open.spotify.com/track');
  });
});


