describe('Tracks - Detalhes', () => {
  it('deve navegar para detalhes quando um ISRC tiver resultado', () => {
    cy.intercept('GET', '**/v1/search*isrc:US7VG1846811*', {
      statusCode: 200,
      body: {
        tracks: {
          items: [
            {
              name: 'Track Test',
              artists: [{ name: 'Artist' }],
              album: {
                name: 'Album',
                images: [{ url: 'https://via.placeholder.com/100' }],
                available_markets: ['BR'],
                release_date: '2020-01-01',
              },
              duration_ms: 123000,
              external_ids: { isrc: 'US7VG1846811' },
              external_urls: { spotify: 'https://open.spotify.com/track/123' },
              preview_url: null,
            },
          ],
        },
      },
    }).as('searchOne');

    cy.visit('/');
    cy.contains('.card-content .title-secondary', 'US7VG1846811').click();
    cy.wait('@searchOne');
    cy.url().should('include', '/tracks/details/US7VG1846811');
    cy.contains('h3', 'Faixas').should('be.visible');
    cy.contains('.badge', 'ISRC US7VG1846811').should('be.visible');
  });
});


