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
  }
};

