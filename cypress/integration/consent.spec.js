describe('Test the Consent form', () => {
  it('redirects to start if no medical report has been started', () => {
    cy.visit('/en/consent');
    cy.url().should('include', '/en/start');
  });

  it('validates all required fields', () => {
    cy.personal();
    cy.visit('/en/consent');

    cy.get('[type="submit"]').click();

    cy.get('#content .error-list').contains('You must select an option');
    // cy.get('[name=socialInsuranceNumber]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Signature is required');
    // cy.get('[name=socialInsuranceNumber]').should('have.attr', 'aria-invalid', 'true');
  });

  /*
  it('toggles display of signature pad on consent', () => {
    cy.personal();
    cy.visit('/en/consent');

    cy.get('[id=consentyes]').check();
    cy.get('[id=signatureBlock]').should('be.visible');

    cy.get('[id=consentno]').check();
    cy.get('[id=signatureBlock]').should('not.be.visible');
  });
  */

  it('displays a message if consent not given', () => {
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
