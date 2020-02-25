const faker = require('faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const name = firstName + ' ' + lastName;

describe('Test the patient to medical handoff', () => {

  it('generates a six-digit code for handoff', () => {
    cy.personal(firstName, lastName);
    cy.consent();
    cy.visit('/en/invite');

    cy.get('[data-cy=applicationCode]').should(($code) => {
      const code = $code.text();

      expect(code).to.have.length(6);
    });
  });

  it('clears the personal form once consent is submitted', () => {
    cy.personal();
    cy.consent();
    cy.visit('/en/invite');

    cy.visit('/en/personal');
    cy.get('[name=socialInsuranceNumber]').should('have.value', '');
  });

  it('can access the dashboard using the generated code and birthdate', () => {
    cy.personal(firstName, lastName, 9, 9, 1999);
    cy.consent();
    cy.visit('/en/invite');

    cy.get('[data-cy=applicationCode]').should(($code) => {
      const code = $code.text();
      expect(code).to.have.length(6);

      cy.visit('/en/doctor');
      cy.get('[name=applicationCode]').type(code);
      cy.get('[name=birtdateMonth]').type('9');
      cy.get('[name=birtdateDay]').type('9');
      cy.get('[name=birtdateYear]').type('1999');
    });
  });
  // access the dashboard using the code and birthdate
  // confirm patient name displayed
  // 

});
