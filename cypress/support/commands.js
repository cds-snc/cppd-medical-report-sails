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

Cypress.Commands.add('fillPersonalForm', () => {
  cy.get('[name=socialInsuranceNumber]').type('198 430 597');
  cy.get('[name=firstName]').type('Cypress');
  cy.get('[name=lastName]').type('Testperson');
  cy.get('[name=birthdateDay]').type('9');
  cy.get('[name=birthdateMonth]').type('9');
  cy.get('[name=birthdateYear]').type('1999');
  cy.get('[name=address]').type('219 Laurier Avenue West');
  cy.get('[name=city]').type('Ottawa');
  cy.get('[name=province]').type('Ontario');
  cy.get('[name=country]').type('Canada');
  cy.get('[name=postal]').type('K1A 1K3');
  cy.get('[name=telephone]').type('555-555-5555');
  cy.get('[type="submit"]').click();
});
