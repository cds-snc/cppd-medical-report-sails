const social = require('social-insurance-number');

describe('Test validation on Personal form', () => {
  beforeEach(() => {
    cy.visit('/en/personal');
  });

  it('fails validation on invalid social insurance number', () => {
    cy.reportA11y();
    cy.get('[name=socialInsuranceNumber]').type('123 456 789');
    cy.get('[type="submit"]').click();
    cy.get('#content .error-list').contains('Social insurance number is invalid').click();
    cy.focused().should('have.attr', 'name', 'socialInsuranceNumber'); // this doesn't seem to work on firefox?
    cy.reportA11y();
  });

  it('accepts a valid social insurance number', () => {
    cy.get('[name=socialInsuranceNumber]').type(social.generate());
    cy.get('[type="submit"]').click();
    cy.get('#content .error-list').contains('Social Insurance Number is invalid').should('not.exist');
    cy.reportA11y();
  });

  it('validates all required fields', () => {
    cy.get('[type="submit"]').click();

    cy.get('#content .error-list').contains('Social insurance number is required');
    cy.get('[name=socialInsuranceNumber]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Enter your first name');
    cy.get('[name=firstName]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Enter your last name');
    cy.get('[name=lastName]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Birthdate day is required');
    cy.get('[name=birthdateDay]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Birthdate month is required');
    cy.get('[name=birthdateMonth]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Birthdate year is required');
    cy.get('[name=birthdateYear]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Mailing address is required');
    cy.get('[name=address]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('City is required');
    cy.get('[name=city]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Province is required');
    cy.get('[name=province]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Country is required');
    cy.get('[name=country]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Postal code is required');
    cy.get('[name=postal]').should('have.attr', 'aria-invalid', 'true');

    cy.get('#content .error-list').contains('Telephone is required');
    cy.get('[name=telephone]').should('have.attr', 'aria-invalid', 'true');

    cy.reportA11y();
  });

  describe('Test date validation', () => {
    it('fails February 31st', () => {
      cy.get('[name=birthdateDay]').type('31');
      cy.get('[name=birthdateMonth]').type('2');
      cy.get('[name=birthdateYear]').type('1999');
      cy.get('[type="submit"]').click();

      cy.get('#content .error-list').contains('Birthdate is not a valid date');
      cy.get('[name=birthdateMonth]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateDay]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateYear]').should('have.attr', 'aria-invalid', 'true');
    });

    it('fails February 29th in a non-leap year', () => {
      cy.visit('/en/personal');
      cy.get('[name=birthdateDay]').type('29');
      cy.get('[name=birthdateMonth]').type('2');
      cy.get('[name=birthdateYear]').type('1999');
      cy.get('[type="submit"]').click();

      cy.get('#content .error-list').contains('Birthdate is not a valid date');
      cy.get('[name=birthdateMonth]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateDay]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateYear]').should('have.attr', 'aria-invalid', 'true');
    });

    it('passes February 29th in a leap year', () => {
      cy.visit('/en/personal');
      cy.get('[name=birthdateDay]').type('29');
      cy.get('[name=birthdateMonth]').type('2');
      cy.get('[name=birthdateYear]').type('2000');
      cy.get('[type="submit"]').click();

      cy.get('#content .error-list').contains('Birthdate is not a valid date').should('not.exist');
      cy.get('[name=birthdateMonth]').should('not.have.attr', 'aria-invalid');
      cy.get('[name=birthdateDay]').should('not.have.attr', 'aria-invalid');
      cy.get('[name=birthdateYear]').should('not.have.attr', 'aria-invalid');
    });

    it('fails April 31st', () => {
      cy.visit('/en/personal');
      cy.get('[name=birthdateDay]').type('31');
      cy.get('[name=birthdateMonth]').type('4');
      cy.get('[name=birthdateYear]').type('1999');
      cy.get('[type="submit"]').click();

      cy.get('#content .error-list').contains('Birthdate is not a valid date');
      cy.get('[name=birthdateMonth]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateDay]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateYear]').should('have.attr', 'aria-invalid', 'true');
    });

    it('fails June 31st', () => {
      cy.get('[name=birthdateDay]').type('31');
      cy.get('[name=birthdateMonth]').type('6');
      cy.get('[name=birthdateYear]').type('1999');
      cy.get('[type="submit"]').click();

      cy.get('#content .error-list').contains('Birthdate is not a valid date');
      cy.get('[name=birthdateMonth]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateDay]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateYear]').should('have.attr', 'aria-invalid', 'true');
    });

    it('fails September 31st', () => {
      cy.get('[name=birthdateDay]').type('31');
      cy.get('[name=birthdateMonth]').type('9');
      cy.get('[name=birthdateYear]').type('1999');
      cy.get('[type="submit"]').click();

      cy.get('#content .error-list').contains('Birthdate is not a valid date');
      cy.get('[name=birthdateMonth]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateDay]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateYear]').should('have.attr', 'aria-invalid', 'true');
    });

    it('fails November 31st', () => {
      cy.get('[name=birthdateDay]').type('31');
      cy.get('[name=birthdateMonth]').type('11');
      cy.get('[name=birthdateYear]').type('1999');
      cy.get('[type="submit"]').click();

      cy.get('#content .error-list').contains('Birthdate is not a valid date');
      cy.get('[name=birthdateMonth]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateDay]').should('have.attr', 'aria-invalid', 'true');
      cy.get('[name=birthdateYear]').should('have.attr', 'aria-invalid', 'true');
    });
  });

  describe('Test email validation', () => {
    it('Passes validation if no email is provided', () => {
      cy.get('[type="submit"]').click();
      cy.get('#content .error-list').contains('valid email').should('not.exist');
    });

    it('Fails validation on invalid format email', () => {
      cy.get('[name=email]').type('asdf');
      cy.get('[type="submit"]').click();
      cy.get('#content .error-list').contains('valid email');
    });

    it('Fails validation on partial email', () => {
      cy.get('[name=email]').type('asdf@');
      cy.get('[type="submit"]').click();
      cy.get('#content .error-list').contains('valid email');

      cy.visit('/en/personal');
      cy.get('[name=email]').type('asdf@asdf');
      cy.get('[type="submit"]').click();
      cy.get('#content .error-list').contains('valid email');
    });

    it('Passes validation on a normal email', () => {
      cy.get('[name=email]').type('email@test.com');
      cy.get('[type="submit"]').click();
      cy.get('#content .error-list').contains('valid email').should('not.exist');

      cy.visit('/en/personal');
      cy.get('[name=email]').type('email+test@test.com');
      cy.get('[type="submit"]').click();
      cy.get('#content .error-list').contains('valid email').should('not.exist');
    });
  });
});
