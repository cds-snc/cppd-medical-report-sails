describe('Run through the patient-facing portion of the service', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.injectAxe().checkA11y();
  });

  it('load start page', () => {
    cy.get('h1').contains('Request a medical report for your Canada Pension Plan Disability Benefits application');
  });

  it('navigate to the personal info screen', () => {
    cy.contains('Start').click();
    cy.url().should('include', '/en/personal');
    cy.get('h1').contains('Your personal details');
  });

  it('check validation on invalid social insurance number', () => {
    cy.visit('/en/personal');
    cy.get('[name=socialInsuranceNumber]').type('123 456 789');
    cy.get('[type="submit"]').click();
    cy.get('#content .error-list').contains('Social Insurance Number is invalid').click();
    cy.focused().should('have.attr', 'name', 'socialInsuranceNumber'); // this doesn't seem to work on firefox?
  });
});
