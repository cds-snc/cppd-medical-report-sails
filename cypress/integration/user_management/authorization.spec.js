describe('Test the User Management authorization', () => {
  before(() => {
    cy.dbseed();
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
    cy.get('h1').contains('Account management');
  });
});
