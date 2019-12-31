module.exports = {
  consent: {
    presence: {
      message: '^You must select an option',
      allowEmpty: false,
    },
  },
  signature: function (value, attributes) {
    const consent = attributes.consent;
    if (consent === '1') {
      return {
        presence: {
          message: '^Signature is Required if you Consent',
          allowEmpty: false
        }
      };
    }
  },
};
