'use strict';

module.exports = {
  attributes: {

    sin: Sequelize.STRING,
    title: Sequelize.STRING,
    first_name: Sequelize.STRING,
    middle_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    last_name_at_birth: Sequelize.STRING,
    birth_date: Sequelize.DATEONLY,
    address: Sequelize.STRING,
    telephone_number: Sequelize.STRING,
    alt_telephone_number: Sequelize.STRING,
    contact_period: Sequelize.ENUM('am','pm','never'),
  },
  options: {
    tableName: 'MedicalReport'
  }
};
