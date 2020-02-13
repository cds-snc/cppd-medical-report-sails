const validate = require('validate.js');
const moment = require('moment');

// load custom validators
validate.validators.validateSIN = require('./validators/sin.validator').validateSIN;
validate.validators.validateDateFormat = require('./validators/dates.validator').validateDateFormat;
validate.validators.validateDateExists = require('./validators/dates.validator').validateDateExists;

// In order to use the date and datetime validators, we have to do some
// work around the fact that Javascript date parsing is garbage. The
// following block is from the documentation: https://validatejs.org/#validators-date

// Before using it we must add the parse and format functions
// Here is a sample implementation using moment.js
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function (value) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function (value, options) {
    var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return moment.utc(value).format(format);
  }
});

module.exports = validate;
