const validator = require('../../../../api/hooks/validate/validators/sin.validator');
const social = require('social-insurance-number');

describe('Unit test SIN validator', () => {

  before(() => {
    expect(validator.validateSIN).to.be.a('function');
  });

  it('passes a valid SIN', () => {
    const sin = social.generate();
    expect(validator.validateSIN(sin, '')).to.eq(undefined);
  });

  it('fails an invalid SIN', () => {
    const sin = '123456789';
    expect(validator.validateSIN(sin, '')).to.be.a('string');
  });
});
