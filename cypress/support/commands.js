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

// shortcut to skip the peronal form
Cypress.Commands.add('personal', () => {
  cy.request({
    method: 'POST',
    url: '/en/personal',
    followRedirect: false,
    form: true,
    body: {
      socialInsuranceNumber: social.generate(),
      firstName: 'Cypress',
      lastName: 'Testperson',
      birthdateDay: '9',
      birthdateMonth: '9',
      birthdateYear: '1999',
      address: '219 Laurier Avenue West',
      city: 'Ottawa',
      province: 'ON',
      country: 'Canada',
      postal: 'K1A 1K3',
      telephone: '555-555-5555'
    }
  })
    .then((res) => {
      expect(res.status).to.eq(302);
      expect(res.redirectedToUrl).to.contains('/en/consent');
    });
});
