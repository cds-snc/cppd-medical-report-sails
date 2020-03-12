const faker = require('faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const name = firstName + ' ' + lastName;

describe('Test the basic patient information section', () => {

  beforeEach(() => {
    cy.personal(firstName, lastName, 9, 9, 1999);
    cy.consent(name);

    cy.visit('/en/invite');

    cy.get('[data-cy=applicationCode]').then(($code) => {
      const code = $code.text();

      cy.loginDoctor(code, '9', '9', '1999');

      cy.visit('/en/dashboard');
      cy.url().should('include', '/en/dashboard');
      cy.get('h1').contains('Patient: ' + name);
    });
  });

  it('validates required fields', () => {
    cy.visit('/en/relationship');
    cy.injectAxe().checkA11y();

    cy.get('[type="submit"]').click();
    cy.injectAxe().checkA11y();

    cy.get('#content .error-list').contains('When did they come into your care is required');
    cy.get('[name=relationshipStarted]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Enter the date you started treating your patient\'s primary medical condition.');
    cy.get('[name=firstTreatmentDate]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Tell us the number of times your patient has visited you in the last 12 months.');
    cy.get('[name=visitNumber]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Enter the date on which your patient last visited you.');
    cy.get('[name=lastVisitDate]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Stopped working is required');
    cy.get('[name=stopWorking]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Stopped working is required');
    cy.get('[name=stopWorking]').should('have.attr', 'aria-invalid', 'true');
  });

  it('conditionally validates when the patient stopped working if stopped working is yes', () => {
    cy.visit('/en/relationship');

    // field should be hidden to start
    cy.get('[data-cy=stopWorkingWhen]').should('not.be.visible');

    // field should be visible if Yes is selected
    cy.get('[id=stopWorking1]').check();
    cy.get('[data-cy=stopWorkingWhen]').should('be.visible');

    // Conditional validation - since stopWorking is yes, we should see an error
    cy.get('[type=submit]').click();
    cy.get('#content .error-list').contains('When they stopped working is required');
    cy.get('[name=stopWorkingWhen]').should('have.attr', 'aria-invalid', 'true');

    // Check visibility of field with stopWorking set to no
    cy.visit('/en/relationship');
    cy.get('[data-cy=stopWorkingWhen]').should('not.be.visible');
    cy.get('[id=stopWorking2]').check();
    cy.get('[data-cy=stopWorkingWhen]').should('not.be.visible');

    // Conditional validation - since stopWorking is no, we shouldn't see the error
    cy.get('[type=submit]').click();
    cy.get('#content .error-list').contains('When they stopped working is required').should('not.exist');

    // Check visibility of field with stopWorking set to Did not discuss
    cy.visit('/en/relationship');
    cy.get('[data-cy=stopWorkingWhen]').should('not.be.visible');
    cy.get('[id=stopWorking3]').check();
    cy.get('[data-cy=stopWorkingWhen]').should('not.be.visible');

    // Conditional validation - since stopWorking is Did not discuss, we shouldn't see the error
    cy.get('[type=submit]').click();
    cy.get('#content .error-list').contains('When they stopped working is required').should('not.exist');
  });
});
