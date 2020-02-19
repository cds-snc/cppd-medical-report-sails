describe('Test the User Management section', () => {
  beforeEach(() => {
    /**
     * TODO: When we add our migrations, this should
     * reset the db then seed the test data.
     */
    cy.exec('npm run db:seed:undo && npm run db:seed');
  });

  it('only allows users with isAdmin flag to access users section', () => {
    // unauthenticated
    cy.visit('/en/users');
    cy.get('h1').contains('Medical adjudication sign in');

    // authenticated but not admin
    cy.login('test@user.com', 'secret');
    cy.visit('/en/users');
    cy.get('h1').contains('Sessions');

    cy.logout();

    // authenticated and isAdmin
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users');
    cy.get('h1').contains('Users');
  });

  it('can access the create user form', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users');
    cy.contains('Create user').click();
    cy.url().should('contain', '/en/users/create');
  });

  it('can create a new user', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users');
    cy.contains('Create user').click();
    cy.url().should('contain', '/en/users/create');

    cy.get('[name=name]').type('Faker name');
    cy.get('[name=email]').type('faker@email.com');
    cy.get('[name=password]').type('secret');
    cy.get('[name=password_confirm]').type('secret');

    // cy.get('[type="submit"]').click();
  });

  // error on existing email

  // edit user
  // delete user
});
