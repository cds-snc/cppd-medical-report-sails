describe('Test the authentication flow for medical adjudicators', () => {
  before(() => {
    cy.visit('/en/login');
  });

  beforeEach(() => {
    cy.injectAxe().checkA11y();
  });

  it('loads the login screen', () => {
    cy.visit('/en/login');
    cy.get('h1').contains('Login');
  });

  it('session page redirects if not logged in', () => {
    cy.request({
      url: '/en/sessions',
      followRedirect: false,
    })
      .then((res) => {
        expect(res.status).to.eq(302);
        expect(res.redirectedToUrl).to.contains('/en/login');
      });
  });

  it('login redirects to sessions on successful login', () => {
    cy.request({
      method: 'POST',
      url: '/en/login',
      followRedirect: false,
      form: true,
      body: {
        email: 'dave.samojlenko@cds-snc.ca',
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

  it('successfully logs in', () => {
    cy.visit('/en/login');
    cy.get('[name=email]').type('dave.samojlenko@cds-snc.ca');
    cy.get('[name=password]').type('secret');
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/en/sessions');
    cy.get('h1').contains('Sessions');
  });

  it('errors on bad credentials', () => {
    cy.visit('/en/login');
    cy.get('[name=email]').type('dave.samojlenko@cds-snc.ca');
    cy.get('[name=password]').type('xxx');
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/en/login');
    cy.get('#content .error-list').contains('Invalid login');
  });
});
