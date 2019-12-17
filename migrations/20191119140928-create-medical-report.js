'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MedicalReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sin: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      middle_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      last_name_at_birth: {
        type: Sequelize.STRING,
      },
      birth_date: {
        type: Sequelize.DATEONLY,
      },
      address: {
        type: Sequelize.STRING,
      },
      telephone_number: {
        type: Sequelize.STRING,
      },
      alt_telephone_number: {
        type: Sequelize.STRING,
      },
      contact_period: {
        type: Sequelize.ENUM('am', 'pm', 'never'),
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('MedicalReports');
  },
};

