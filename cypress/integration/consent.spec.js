const faker = require('faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const name = firstName + ' ' + lastName;

describe('Test the Consent form', () => {
  before(() => {
    cy.dbseed();
  });

  it('redirects to start if no medical report has been started', () => {
    cy.visit('/en/consent');
    cy.url().should('include', '/en/start');
  });

  it('validates all required fields', () => {
    cy.personal();
    cy.visit('/en/consent');
    cy.reportA11y()
    cy.get('[type="submit"]').click();

    // both radios will display this error
    cy.get('#content .error-list ol').within(() => {
      cy.get('li').should('have.length', 2);

      cy.get('li').eq(0).contains('You must select an option');
      cy.get('li a').eq(0).should('have.attr', 'href', '#consent');

      cy.get('li').eq(1).contains('You must select an option');
      cy.get('li a').eq(1).should('have.attr', 'href', '#signatureMode');
      cy.reportA11y()
    });

    // conditional validation once signature mode is selected
    cy.get('[id=signatureModetype').check();
    cy.get('[id=signature_type]').should('be.visible');
    cy.get('[type="submit"]').click();

    cy.get('#content .error-list').contains('Make sure you provide your signature');

    // conditional validation also applies to draw mode
    cy.get('[id=signatureModedraw').check();
    cy.get('[id=signature_draw]').should('be.visible');
    cy.get('[type="submit"]').click();

    cy.get('#content .error-list').contains('Make sure you provide your signature');
  });

  it('displays an inline message if consent=no selected', () => {
    cy.personal();
    cy.visit('/en/consent');
    cy.get('[data-cy=noConsentMsg]').should('not.be.visible');

    cy.get('[id=consentno]').check();
    cy.get('[data-cy=noConsentMsg]').should('be.visible');
    cy.reportA11y()
  });

  it('toggles between type and draw signature', () => {
    cy.personal();
    cy.visit('/en/consent');

    cy.get('[id=consentyes]').check();
    cy.get('[id=signatureBlock]').should('be.visible');

    cy.get('[id=signatureModetype]').check();
    cy.get('[id=signature_type]').should('be.visible');
    cy.get('[id=signature_draw]').should('not.be.visible');

    cy.get('[id=signatureModedraw]').check();
    cy.get('[id=signature_draw]').should('be.visible');
    cy.get('[id=signature_type]').should('not.be.visible');
    cy.reportA11y()
  });

  // Medical Professional positive consent view
  it('displays positive consent for a medical professional', () => {
    cy.personal(firstName, lastName, 9, 9, 1999);
    cy.consent(name, 'yes');
    cy.visit('/en/invite');

    cy.get('[data-cy=applicationCode]').then(($code) => {
      const code = $code.text();

      cy.visit('/en/doctor');
      cy.get('[name=applicationCode]').type(code);
      cy.get('[name=birthdateMonth]').type('9');
      cy.get('[name=birthdateDay]').type('9');
      cy.get('[name=birthdateYear]').type('1999');

      cy.get('[data-cy=start]').click();
      cy.url().should('include', '/en/dashboard');

      cy.get('[data-cy=view-consent-link]').click();

      cy.get('h1').contains('consent to share medical and personal information');
      cy.get('h1').contains(name);
      cy.get('[data-cy=consent-given]').contains(name + ' has given consent for you');
    });
  });

  // No negative consent for Medical Professional

  // Medical Adjudicator consent view
  it('displays positive consent for a Medical Adjudicator', () => {
    // resetting the db so we only have one session makes this easier
    cy.dbseed();

    cy.personal(firstName, lastName, 9, 9, 1999);
    cy.consent(name, 'yes');
    cy.visit('/en/invite');

    cy.login('test@user.com', 'secret');
    cy.visit('/en/reports');

    cy.visit('/en/reports/1/consent');
    cy.get('[data-cy=consent-given]').contains(name + ' has given their healthcare practitioner consent');
  });

  it('displays negative consent for a Medical Adjudicator', () => {
    // resetting the db so we only have one session makes this easier
    cy.dbseed();

    cy.personal(firstName, lastName, 9, 9, 1999);
    cy.consent(name, 'no');
    cy.visit('/en/invite');

    cy.login('test@user.com', 'secret');
    cy.visit('/en/reports');

    cy.visit('/en/reports/1/consent');
    cy.get('[data-cy=consent-not-given]').contains(name + ' has not given their healthcare practitioner consent');
  });
});
