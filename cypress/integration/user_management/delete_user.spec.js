const faker = require('faker');

describe('Test the Delete User flow', () => {
  const adminUser = 'admin@user.com';
  const adminPass = 'secret';
  const testUserName = faker.name.findName();
  const testUserEmail = 'fake@user.com';

  before(() => {
    /**
     * TODO: When we add our migrations, this should
     * reset the db then seed the test data.
     */
    cy.exec('npm run db:seed:undo && npm run db:seed');
  });

  it('can ask for confirmation when deleting a user', () => {
    cy.login(adminUser, adminPass);
    cy.createUser(testUserName, testUserEmail, 'secret');
    cy.visit('/en/users');

    // find the user record we just created
    cy.get('[data-cy=name]').contains('td', testUserName)
      .parent()
      .within($tr => {
        cy.get('td a')
          .contains('Delete')
          .click();
      });

    cy.get('[data-cy=name]').contains('td', testUserName).should('not.exist');

    // edit the first user in the table
    /* cy.get('[data-cy=name]').first().invoke('text').then((userName) => {
      cy.get('[data-cy=edit]').first().click();
      cy.get('h1').contains('Edit a user');
      cy.get('[name=name]').should('have.value', userName).clear().type('Test User 2{enter}');
    }); */
  });


});
