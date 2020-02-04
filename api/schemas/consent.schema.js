module.exports = {
  consent: {
    presence: {
      message: '^You must select an option',
      allowEmpty: false,
    },
  },
  signature_mode: {
    presence: {
      message: '^You must select an option',
      allowEmpty: false,
    },
  },
  signature_draw_data: function (value, attributes) {
    const mode = attributes.signature_mode;
    if (mode === 'draw') {
      return {
        presence: {
          message: '^Signature is required',
          allowEmpty: false
        }
      };
    }
  },
  signature_typed: function (value, attributes) {
    const mode = attributes.signature_mode;
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
