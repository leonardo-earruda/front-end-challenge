describe('Tracks - Badge de disponibilidade', () => {
  it('deve mostrar disponível no Brasil quando market inclui BR', () => {
    cy.intercept('GET', '**/v1/search*', (req) => {
      if (req.url.includes('US7VG1846811')) {
        req.alias = 'br';
        req.reply({ fixture: 'search_one_track_br.json' });
      }
    });

    cy.visit('/');
    cy.contains('.card-content .title-secondary', 'US7VG1846811').click();
    cy.wait('@br');
    cy.contains('.availability-badge', 'Disponível no Brasil').should('be.visible');
  });

  it('deve mostrar indisponível no Brasil quando market não inclui BR', () => {
    cy.intercept('GET', '**/v1/search*', (req) => {
      if (req.url.includes('US7QQ1846811')) {
        req.alias = 'foreign';
        req.reply({ fixture: 'search_one_track_foreign.json' });
      }
    });

    cy.visit('/');
    cy.contains('.card-content .title-secondary', 'US7QQ1846811').click();
    cy.wait('@foreign');
    cy.contains('.availability-badge', 'Indisponível no Brasil').should('be.visible');
  });
});


