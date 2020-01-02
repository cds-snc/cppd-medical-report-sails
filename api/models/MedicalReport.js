'use strict';

module.exports = {
  attributes: {

    sin: Sequelize.STRING,
    title: Sequelize.STRING,
    firstName: Sequelize.STRING,
    middleName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    lastNameAtBirth: Sequelize.STRING,
    birthDate: Sequelize.DATEONLY,
    address: Sequelize.STRING,
    telephoneNumber: Sequelize.STRING,
    altTelephoneNumber: Sequelize.STRING,
    contactPeriod: Sequelize.ENUM('morning','afternoon','letters_only'),
  },
  options: {
    tableName: 'MedicalReports'
  }
};
