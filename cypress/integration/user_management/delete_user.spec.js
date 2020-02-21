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

  it('can delete a user', () => {
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
  });
});
