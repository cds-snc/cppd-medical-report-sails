module.exports = {
  name: {
    presence: {
      allowEmpty: false,
      message: '^Name is required'
    }
  },
  email: {
    presence: {
      allowEmpty: false,
      message: '^Email is required'
    },
    email: true
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^Password is required'
    }
  },
  passwordConfirm: {
    presence: {
      allowEmpty: false,
      message: '^Password confirm is required'
    },
    equality: {
      attribute: 'password',
      message: '^Passwords must match'
    },
    // TODO: complexity
    // TODO: existing email
  },
};
