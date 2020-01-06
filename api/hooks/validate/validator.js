const validate = require('validate.js');

// load custom validators
validate.validators.validateSIN = require('./validators/sin.validator').validateSIN;
validate.validators.validateDateFormat = require('./validators/dates.validator').validateDateFormat;
validate.validators.validateDateExists = require('./validators/dates.validator').validateDateExists;


module.exports = validate;
