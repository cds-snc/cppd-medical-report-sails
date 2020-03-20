module.exports = {
  consent: {
    presence: {
      message: '^errors.consent.consent',
      allowEmpty: false,
    },
  },
  signatureMode: {
    presence: {
      message: '^errors.consent.signature_mode',
      allowEmpty: false,
    },
  },
  signatureDrawData: function (value, attributes) {
    const mode = attributes.signatureMode;
    if (mode === 'draw') {
      return {
        presence: {
          message: '^errors.consent.signature_required',
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
          message: '^errors.consent.signature_required',
          allowEmpty: false
        }
      };
    }
  }
};
