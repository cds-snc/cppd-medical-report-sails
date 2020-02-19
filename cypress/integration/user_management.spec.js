describe('Test the User Management section', () => {
  beforeEach(() => {
    /**
     * TODO: When we add our migrations, this should
     * reset the db then seed the test data.
     */
    cy.exec('npm run db:seed:undo && npm run db:seed');
  });

  it('only allows users with isAdmin flag to access users section', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users');
    cy.get('h1').contains('Users');

    cy.logout();

    cy.login('test@user.com', 'secret');
    cy.visit('/en/users');
    cy.get('h1').contains('Sessions');
    // should redirect to sessions
  });

});
