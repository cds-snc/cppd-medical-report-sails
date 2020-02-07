module.exports = {
  practitionerType: {
    presence: {
      message: '^I am a is required',
      allowEmpty: false,
    },
  },
  practitionerTypeOtherSpecify: function (value, attributes) {
    const practitionerType = attributes.practitionerType;
    if (practitionerType === '4') {
      return {
        presence: {
          message: '^Other is required if Other is selected',
          allowEmpty: false
        }
      };
    }
  },
  practitionerFirstName: {
    presence: {
      message: '^First name is required',
      allowEmpty: false,
    },
  },
  practitionerLastName: {
    presence: {
      message: '^Last name is required',
      allowEmpty: false,
    },
  },
  practitionerAddress: {
    presence: {
      message: '^Address is required',
      allowEmpty: false,
    },
  },
  practitionerCity: {
    presence: {
      message: '^errors.city_required',
      allowEmpty: false,
    },
  },
  practitionerProvince: {
    presence: {
      message: '^errors.province_required',
      allowEmpty: false,
    },
  },
  practitionerCountry: {
    presence: {
      message: '^errors.country_required',
      allowEmpty: false,
    },
  },
  practitionerPostal: {
    presence: {
      message: '^errors.postal_required',
      allowEmpty: false,
    },
  },
  practitionerPhone: {
    presence: {
      message: '^errors.phone_required',
      allowEmpty: false,
    },
  },
};
