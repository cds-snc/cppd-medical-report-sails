const isValidDateFormat = string => {
  // validates format: YYYY-MM-DD
  return /^(\d{4})-(\d{2})-(\d{2})$/.test(string);
};

const daysInMonth = function (m, y) {
  // m is 0-indexed, so february = 1
  switch (m) {
    case 1:
      return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
    case 8: case 3: case 5: case 10:
      return 30;
    default:
      return 31;
  }
};

// expects YYYY-MM-DD
const isValidDate = function (dateString) {
  const parts = dateString.split('-');
  const y = parts[0];
  let m = parts[1];
  const d = parts[2];

  m = parseInt(m, 10) - 1;
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
};

const validateDateExists = function (value, options) {
  if (!isValidDate(value)) {
    return options.message || 'is not a valid date';
  }
};

const validateDateFormat = function (value, options) {
  if (!isValidDateFormat(value)) {
    return options.message || 'is not a valid date format';
  }
};

module.exports = {
  validateDateFormat,
  validateDateExists,
};
