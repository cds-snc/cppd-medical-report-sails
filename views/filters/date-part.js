/**
 * nunjucks date-filter
 * Not super complicated. Expects date in ISO8601 format YYYY-MM-DD.
 * Splits it up into its parts, and returns the part being asked for.
 */

'use strict';

var nunjucks = require('nunjucks');

// a date part filter for Nunjucks
// usage: {{ my_date | datePart(YYYY|MM|DD) }}
function datePart(date, part) {
  // [0] = YYYY
  // [1] = MM
  // [2] = DD
  let parts = date.split('-');

  if (part === 'YYYY') {
    return parts[0];
  }

  if (part === 'MM') {
    return parts[1];
  }

  if (part === 'DD') {
    return parts[2];
  }

  return;
}
module.exports = datePart;

// install the filter to nunjucks environment
module.exports.install = function (env, customName) {
  (env || nunjucks.configure()).addFilter(customName || 'datePart', datePart);
};