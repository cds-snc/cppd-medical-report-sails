describe('Test the authentication flow for medical adjudicators', () => {
  before(() => {
    /**
     * TODO: When we add our migrations, this should
     * reset the db then seed the test data.
     */
    cy.exec('npm run db:seed:undo && npm run db:seed');

    cy.visit('/en/login');
  });

  it('loads the login screen', () => {
    cy.visit('/en/login');
    cy.get('h1').contains('Medical adjudication sign in');
    cy.injectAxe().checkA11y();
  });

  /**
   * TODO: Add other authenticated routes as we create them.
   */
  it('cannot access protected routes when not logged in', () => {
    const routes = [
      '/en/sessions',
      '/en/sessions/1/view',
      '/en/logout'
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
        expect(res.redirectedToUrl).to.contains('/en/sessions');
      });

    cy.visit('/en/sessions');
    cy.get('h1').contains('Sessions');
  });

  // Basically the same test as above but using the UI directly
  it('successfully logs in', () => {
    cy.visit('/en/login');
    cy.get('[name=email]').type('test@user.com');
    cy.get('[name=password]').type('secret');
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/en/sessions');
    cy.get('h1').contains('Sessions');
  });

  it('errors on bad credentials', () => {
    cy.visit('/en/login');
    cy.get('[name=email]').type('test@user.com');
    cy.get('[name=password]').type('xxx');
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/en/login');
    cy.get('#content .error-list').contains('Invalid login');
    cy.injectAxe().checkA11y();
  });

  it('logs me out', () => {
    cy.login('test@user.com', 'secret');
    cy.visit('/en/logout');
    cy.url().should('include', '/en/login');
    cy.visit('/en/sessions');
    cy.url().should('include', '/en/login');
  });
});
