describe('Test the Create User flow', () => {
  before(() => {
    /**
     * TODO: When we add our migrations, this should
     * reset the db then seed the test data.
     */
    cy.exec('npm run db:seed:undo && npm run db:seed');
  });

  it('can access the create user form', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users');
    cy.get('[data-cy=create-user]').click();
    cy.url().should('contain', '/en/users/create');
  });

  it('validates required fields', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users/create');
    cy.get('[data-cy="submit"]').click();

    cy.get('#content .error-list').contains('Name is required');
    cy.get('#content .error-list').contains('Email is required');
    cy.get('#content .error-list').contains('Password is required');
    cy.get('#content .error-list').contains('Password confirm is required');
  });

  it('validates matching password fields', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users/create');
    cy.get('[data-cy="submit"]').click();

    cy.get('[name=name]').type('Faker name');
    cy.get('[name=email]').type('fake@user.com');
    cy.get('[name=password]').type('secret');
    cy.get('[name=passwordConfirm]').type('secret2');
    cy.get('[data-cy="submit"]').click();

    cy.get('#content .error-list').contains('Passwords must match');
  });

  it('validates email format', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users/create');

    cy.get('[name=name]').type('Faker name');
    cy.get('[name=email]').type('notanemail');

    cy.get('[data-cy="submit"]').click();
    cy.get('#content .error-list').contains('Email is not a valid email');
  });

  it('validates existing email', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users/create');

    cy.get('[name=name]').type('Faker name');
    cy.get('[name=email]').type('admin@user.com');
    cy.get('[name=password]').type('secret');
    cy.get('[name=passwordConfirm]').type('secret');
    cy.get('[data-cy="submit"]').click();

    cy.get('#content .error-list').contains('Email address already taken');
  });

  it('can create a new user', () => {
    cy.login('admin@user.com', 'secret');
    cy.visit('/en/users');
    cy.contains('Add new user').click();
    cy.url().should('contain', '/en/users/create');

    cy.get('[name=name]').type('Faker name');
    cy.get('[name=email]').type('fake@user.com');
    cy.get('[name=password]').type('secret');
    cy.get('[name=passwordConfirm]').type('secret');

    cy.get('[data-cy="submit"]').click();

    cy.get('h1').contains('Account management');
    cy.get('table').contains('td', 'Faker name');
    cy.get('table').contains('td', 'fake@user.com');
  });
});
