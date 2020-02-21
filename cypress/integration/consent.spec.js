describe('Test the Consent form', () => {
  beforeEach(() => {
    cy.personal();
    cy.visit('/en/consent');
  });

  it('validates all required fields', () => {
    cy.get('[type="submit"]').click();

    cy.get('#content .error-list').contains('You must select an option');
    // cy.get('[name=socialInsuranceNumber]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Signature is required');
    // cy.get('[name=socialInsuranceNumber]').should('have.attr', 'aria-invalid', 'true');
  });

  it('toggles between type and draw signature', () => {
    cy.get('[id=signatureModetype]').check();
    cy.get('[id=signature_type]').should('be.visible');
    cy.get('[id=signature_draw]').should('not.be.visible');

    cy.get('[id=signatureModedraw]').check();
    cy.get('[id=signature_draw]').should('be.visible');
    cy.get('[id=signature_type]').should('not.be.visible');
  });
});
