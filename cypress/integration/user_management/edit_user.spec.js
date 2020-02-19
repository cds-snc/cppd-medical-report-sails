describe('Test the Edit User flow', () => {
  before(() => {
    /**
     * TODO: When we add our migrations, this should
     * reset the db then seed the test data.
     */
    cy.exec('npm run db:seed:undo && npm run db:seed');
  });

  it('can access the edit user form', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users');
    // cy.contains('Create user').click();
    // cy.url().should('contain', '/en/users/create');
  });


});
