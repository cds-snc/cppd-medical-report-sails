describe('Test the Consent form', () => {
  it('redirects to start if no medical report has been started', () => {
    cy.visit('/en/consent');
    cy.url().should('include', '/en/start');
  });

  it('validates all required fields', () => {
    cy.personal();
    cy.visit('/en/consent');
    cy.get('[type="submit"]').click();

    // both radios will display this error
    cy.get('#content .error-list ol').within(() => {
      cy.get('li').should('have.length', 2);

      cy.get('li').eq(0).contains('You must select an option');
      cy.get('li a').eq(0).should('have.attr', 'href', '#consent');

      cy.get('li').eq(1).contains('You must select an option');
      cy.get('li a').eq(1).should('have.attr', 'href', '#signatureMode');
    });

    // conditional validation once signature mode is selected
    cy.get('[id=signatureModetype').check();
    cy.get('[id=signature_type]').should('be.visible');
    cy.get('[type="submit"]').click();

    cy.get('#content .error-list').contains('Signature is required');

    // conditional validation also applies to draw mode
    cy.get('[id=signatureModedraw').check();
    cy.get('[id=signature_draw]').should('be.visible');
    cy.get('[type="submit"]').click();

    cy.get('#content .error-list').contains('Signature is required');
  });

  it('displays an inline message if consent=no selected', () => {
    cy.personal();
    cy.visit('/en/consent');
    cy.get('[data-cy=noConsentMsg]').should('not.be.visible');

    cy.get('[id=consentno]').check();
    cy.get('[data-cy=noConsentMsg]').should('be.visible');
  });

  it('toggles between type and draw signature', () => {
    cy.personal();
    cy.visit('/en/consent');

    cy.get('[id=consentyes]').check();
    cy.get('[id=signatureBlock]').should('be.visible');

    cy.get('[id=signatureModetype]').check();
    cy.get('[id=signature_type]').should('be.visible');
    cy.get('[id=signature_draw]').should('not.be.visible');

    cy.get('[id=signatureModedraw]').check();
    cy.get('[id=signature_draw]').should('be.visible');
    cy.get('[id=signature_type]').should('not.be.visible');
  });
});
