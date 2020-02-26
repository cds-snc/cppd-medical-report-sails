describe('Test the Edit User flow', () => {
  const adminUser = 'admin@user.com';
  const adminPass = 'secret';

  before(() => {
    cy.dbseed();
  });

  it('can access the edit user form', () => {
    cy.login(adminUser, adminPass);
    cy.visit('/en/users');

    // edit the first user in the table
    cy.get('[data-cy=name]').first().invoke('text').then((userName) => {
      cy.get('[data-cy=edit]').first().click();
      cy.get('h1').contains('Edit a user');
      cy.get('[name=name]').should('have.value', userName);
    });
  });

  it('can edit a user', () => {
    cy.login(adminUser, adminPass);
    cy.visit('/en/users');

    // edit the first user in the table
    cy.get('[data-cy=name]').first().invoke('text').then((userName) => {
      cy.get('[data-cy=edit]').first().click();
      cy.get('h1').contains('Edit a user');
      cy.get('[name=name]').should('have.value', userName).clear().type('Test User 2{enter}');
    });
  });


});
