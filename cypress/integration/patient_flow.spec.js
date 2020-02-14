describe('Run through the patient-facing portion of the service', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.injectAxe().checkA11y();
  });

  it('loads start page', () => {
    cy.get('h1').contains('Request a medical report for your Canada Pension Plan Disability Benefits application');
  });

  it('navigates to the personal info screen', () => {
    cy.contains('Start').click();
    cy.url().should('include', '/en/personal');
    cy.get('h1').contains('Your personal details');
  });

  it('successfully submits a completed personal information form', () => {
    cy.visit('/en/personal');
    cy.fillPersonalForm();
    cy.get('h1').contains('Consent for Service Canada to obtain personal information');
  });

  it('successfully submits a completed consent form', () => {
    cy.visit('/en/personal');
    cy.fillPersonalForm();
    cy.get('h1').contains('Consent for Service Canada to obtain personal information');

    cy.get('[id=consentyes]').check();
    cy.get('[id=signatureModetype]').check();
    cy.get('[name=signatureTyped]').type('Cypress Testerman');
    cy.get('[type="submit"]').click();

    cy.get('h1').contains('Give this code to your doctor or nurse practitioner');
  });
});
