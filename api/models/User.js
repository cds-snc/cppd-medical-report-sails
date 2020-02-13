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
  options: {
    tableName: 'Users',
    instanceMethods: {
      checkPassword: function (password, cb) {
        bcrypt.compare(password, this.password, (err, match) => {
          if (err) { return cb(err); }

          if (match) {
            return cb(null, true);
          }

          return cb(err);
        });
      },
      toJSON: function () {
        let values = Object.assign({}, this.get());

        delete values.password;
        return values;
      }
    }
  },
};
