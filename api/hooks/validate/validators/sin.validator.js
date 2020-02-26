const SocialInsuranceNumber = require('social-insurance-number');

const validateSIN = function (value, options) {
  const sin = new SocialInsuranceNumber(value);

  if (!sin.isValid()) {
    return options.message || 'is invalid';
  }
};

module.exports = {
  validateSIN,
};
