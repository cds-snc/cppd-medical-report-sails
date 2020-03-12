describe('Test the authentication flow for medical adjudicators', () => {
  before(() => {
    cy.dbseed();

    cy.visit('/en/login');
  });

  it('loads the login screen', () => {
    cy.visit('/en/login');
    cy.get('h1').contains('Medical adjudication sign in');
    cy.reportA11y()
  });

  /**
   * TODO: Add other authenticated routes as we create them.
   */
  it('cannot access protected routes when not logged in', () => {
    const routes = [
      '/en/reports',
      '/en/reports/1/view'
    ];

    routes.forEach((route) => {
      cy.request({
        url: route,
        followRedirect: false,
      })
        .then((res) => {
          expect(res.status).to.eq(302);
          expect(res.redirectedToUrl).to.contains('/en/login');
        });
    });
  });

  it('redirects to sessions on successful login', () => {
    cy.request({
      method: 'POST',
      url: '/en/login',
      followRedirect: false,
      form: true,
      body: {
        email: 'test@user.com',
        password: 'secret'
      }
    })
      .then((res) => {
        expect(res.status).to.eq(302);
        expect(res.redirectedToUrl).to.contains('/en/reports');
      });

    cy.visit('/en/reports');
    cy.get('h1').contains('Sessions');
  });

  // Basically the same test as above but using the UI directly
  it('successfully logs in', () => {
    cy.visit('/en/login');
    cy.get('[name=email]').type('test@user.com');
    cy.get('[name=password]').type('secret');
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/en/reports');
    cy.get('h1').contains('Sessions');
  });

  it('errors on bad credentials', () => {
    cy.visit('/en/login');
    cy.get('[name=email]').type('test@user.com');
    cy.get('[name=password]').type('xxx');
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/en/login');
    cy.get('#content .error-list').contains('Invalid login');
    cy.reportA11y()
  });

  it('can only see a logout link when logged in', () => {
    // link's not there when not signed in
    cy.visit('/en/start');
    cy.get('[data-cy=logout]').should('not.exist');

    // link is visible, try clicking it
    cy.login('test@user.com', 'secret');
    cy.visit('/en/reports');
    cy.get('[data-cy=logout]').should('be.visible').click();

    // logged out
    cy.get('h1').contains('signed out');
    cy.url().should('include', '/en/loggedout');
  });

  // is this redundant?
  it('logs me out', () => {
    cy.login('test@user.com', 'secret');
    cy.visit('/en/logout').url().should('include', '/en/loggedout');
    cy.visit('/en/reports');
    cy.url().should('include', '/en/login');
  });
});
