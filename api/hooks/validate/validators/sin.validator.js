const validateLuhn = string => {
  // Validates using Luhn Algorithm
  let nCheck = 0
  let bEven = false
  string = string.replace(/\D/g, "")

  for (var n = string.length - 1; n >= 0; n--) {
    var cDigit = string.charAt(n)
    var nDigit = parseInt(cDigit, 10)

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) === 0;
}

const validateSIN = function (value, options, key, attributes) {
  if (!validateLuhn(value)) {
    return options.message || 'is invalid';
  }
}

module.exports = {
  validateSIN,
}