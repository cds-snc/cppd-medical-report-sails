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

Cypress.Commands.add('dbseed', () => {
  cy.exec('npm run db:migrate:undo && npm run db:migrate && npm run db:seed');
});

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

Cypress.Commands.add('consent', (name, consent) => {
  cy.request({
    method: 'POST',
    url: '/en/consent',
    followRedirect: false,
    form: true,
    body: {
      consent: consent || 'yes',
      signatureMode: 'type',
      signatureTyped: name || 'Test Name',
      applicantSubmittedAt: moment().format()
    }
  })
    .then((res) => {
      expect(res.status).to.eq(302);

      if (consent === 'no') {
        expect(res.redirectedToUrl).to.contains('/en/no_consent');
      } else {
        expect(res.redirectedToUrl).to.contains('/en/invite');
      }
    });
});

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/en/login',
    followRedirect: false,
    form: true,
    body: {
      email: email,
      password: password
    }
  })
    .then((res) => {
      expect(res.status).to.eq(302);
    });
});

Cypress.Commands.add('createUser', (name, email, password) => {
  cy.request({
    method: 'POST',
    url: '/en/users',
    followRedirect: false,
    form: true,
    body: {
      name: name,
      email: email,
      password: password,
      passwordConfirm: password
    }
  })
    .then((res) => {
      expect(res.status).to.eq(302);
      // expect(res.redirectedToUrl).to.contains('/en/users');
    });
});

Cypress.Commands.add('logout', () => {
  cy.visit('/en/logout');
});
