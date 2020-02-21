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

// shortcut to skip the peronal form
Cypress.Commands.add('personal', () => {
  cy.request({
    method: 'POST',
    url: '/en/personal',
    followRedirect: false,
    form: true,
    body: {
      socialInsuranceNumber: social.generate(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthdateDay: '9',
      birthdateMonth: '9',
      birthdateYear: '1999',
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      province: 'ON',
      country: 'Canada',
      postal: 'K1A 1K3',
      telephone: faker.phone.phoneNumber()
    }
  })
    .then((res) => {
      expect(res.status).to.eq(302);
      expect(res.redirectedToUrl).to.contains('/en/consent');
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
      expect(res.redirectedToUrl).to.contains('/en/sessions');
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
      expect(res.redirectedToUrl).to.contains('/en/users');
    });
});

Cypress.Commands.add('logout', () => {
  cy.visit('/en/logout');
});
