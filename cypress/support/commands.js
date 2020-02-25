// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const social = require('social-insurance-number');
const faker = require('faker');
const moment = require('moment');

// shortcut to skip the peronal form
Cypress.Commands.add('personal', (firstName, lastName, birthdateDay, birthdateMonth, birthdateYear, address, city, province, country, postal, telephone) => {
  cy.request({
    method: 'POST',
    url: '/en/personal',
    followRedirect: false,
    form: true,
    body: {
      socialInsuranceNumber: social.generate(),
      firstName: firstName || faker.name.firstName(),
      lastName: lastName || faker.name.lastName(),
      birthdateDay: birthdateDay || '9',
      birthdateMonth: birthdateMonth || '9',
      birthdateYear: birthdateYear || '1999',
      address: address || faker.address.streetAddress(),
      city: city || faker.address.city(),
      province: province || 'ON',
      country: country || 'Canada',
      postal: postal || 'K1A 1K3',
      telephone: telephone || faker.phone.phoneNumber()
    }
  })
    .then((res) => {
      expect(res.status).to.eq(302);
      expect(res.redirectedToUrl).to.contains('/en/consent');
    });
});

Cypress.Commands.add('consent', () => {
  cy.request({
    method: 'POST',
    url: '/en/consent',
    followRedirect: false,
    form: true,
    body: {
      consent: true,
      consent_optional_parties: ['education', 'accountant', 'financial', 'volunteer', 'employees'],
      signatureMode: 'type',
      signatureTyped: 'Test Name',
      applicantSubmittedAt: moment().format()
    }
  })
    .then((res) => {
      expect(res.status).to.eq(302);
      expect(res.redirectedToUrl).to.contains('/en/invite');
    });
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/en/login');
  cy.injectAxe().checkA11y();

  cy.get('[name=email]').type(email);
  cy.get('[name=password]').type(password);
  cy.get('[type="submit"]').click();
  cy.url().should('include', '/en/sessions');
  cy.get('h1').contains('Sessions');
});
