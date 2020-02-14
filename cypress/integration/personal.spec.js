describe('Test validation on Personal form', () => {
  beforeEach(() => {
    cy.visit('/en/personal');
    cy.injectAxe().checkA11y();
  });

  it('fails validation on invalid social insurance number', () => {
    cy.injectAxe().checkA11y();
    cy.get('[name=socialInsuranceNumber]').type('123 456 789');
    cy.get('[type="submit"]').click();
    cy.get('#content .error-list').contains('Social Insurance Number is invalid').click();
    cy.focused().should('have.attr', 'name', 'socialInsuranceNumber'); // this doesn't seem to work on firefox?
    cy.injectAxe().checkA11y();
  });

  it('accepts a valid social insurance number', () => {
    cy.get('[name=socialInsuranceNumber]').type('198 430 597');
    cy.get('[type="submit"]').click();
    cy.get('#content .error-list').contains('Social Insurance Number is invalid').should('not.exist');
    cy.injectAxe().checkA11y();
  });

  it('validates all required fields', () => {
    cy.get('[type="submit"]').click();

    cy.get('#content .error-list').contains('Social Insurance Number is required');
    cy.get('[name=socialInsuranceNumber]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('First name is required');
    cy.get('[name=firstName]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Last name is required');
    cy.get('[name=lastName]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Birthdate day is required');
    cy.get('[name=birthdateDay]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Birthdate month is required');
    cy.get('[name=birthdateMonth]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Birthdate year is required');
    cy.get('[name=birthdateYear]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Mailing address is required');
    cy.get('[name=address]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('City is required');
    cy.get('[name=city]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Province is required');
    cy.get('[name=province]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Country is required');
    cy.get('[name=country]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Postal code is required');
    cy.get('[name=postal]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Telephone is required');
    cy.get('[name=telephone]').should('have.attr', 'aria-invalid', 'true');

    cy.injectAxe().checkA11y();
  });

  // email validation
  // date validation
});
