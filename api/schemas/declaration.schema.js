module.exports = {
  practitionerTimezoneOffset: {
    numericality: {
      strict: true,
      greaterThanOrEqualTo: -12,
      lessThanOrEqualTo: 14,
      message: "errors.declaration.timezone_offset_invalid"
    }
  },
};
