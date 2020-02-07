module.exports = {
  consent: {
    presence: {
      message: '^You must select an option',
      allowEmpty: false,
    },
  },
  signatureMode: {
    presence: {
      message: '^You must select an option',
      allowEmpty: false,
    },
  },
  signatureDrawData: function (value, attributes) {
    const mode = attributes.signatureMode;
    if (mode === 'draw') {
      return {
        presence: {
          message: '^Signature is required',
          allowEmpty: false
        }
      };
    }
  },
  signatureTyped: function (value, attributes) {
    const mode = attributes.signatureMode;
    if (mode === 'type') {
      return {
        presence: {
          message: '^Signature is required',
          allowEmpty: false
        }
      };
    }
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
