'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Test User',
      email: 'test@user.com',
      password: bcrypt.hashSync('secret', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {email: {[Op.in]: ['test@user.com']}}, {});
  }
};
