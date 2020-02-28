const social = require('social-insurance-number');
const faker = require('faker');

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

    cy.get('[name=socialInsuranceNumber]').type(social.generate());
    cy.get('[name=firstName]').type(faker.name.firstName());
    cy.get('[name=lastName]').type(faker.name.lastName());
    cy.get('[name=birthdateDay]').type('9');
    cy.get('[name=birthdateMonth]').type('9');
    cy.get('[name=birthdateYear]').type('1999');
    cy.get('[name=address]').type(faker.address.streetAddress());
    cy.get('[name=city]').type(faker.address.city());
    cy.get('[name=province]').type('Ontario');
    cy.get('[name=country]').type('Canada');
    cy.get('[name=postal]').type('K1A 1K3');
    cy.get('[name=telephone]').type(faker.phone.phoneNumber());
    cy.get('[type="submit"]').click();

    cy.url().should('contain', '/en/consent');
  });

  it('successfully submits a completed consent form', () => {
    cy.personal();
    cy.visit('/en/consent');

    cy.get('[id=consentyes]').check();
    cy.get('[id=signatureModetype]').check();
    cy.get('[name=signatureTyped]').type('Cypress Testerman');
    cy.get('[type="submit"]').click();

    cy.get('h1').contains('Give this code to your doctor or nurse practitioner');
  });
});
