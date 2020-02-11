'use strict';

const bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name: {
      type: Sequelize.STRING,
      required: true
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    }
  },
  customToJSON: function () {
    return _.omit(this, ['password'])
  },
  options: {
    tableName: 'Users'
  },

  checkPassword: function (password, cb) {
    bcrypt.compare(password, this.password, (err, match) => {
      if (err) { return cb(err); }

      if (match) {
        return cb(null, true);
      }

      return cb(err);
    });
  }

  /*
  checkPassword: (password, user, cb) => {
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) { cb(err); }

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  } */
};

