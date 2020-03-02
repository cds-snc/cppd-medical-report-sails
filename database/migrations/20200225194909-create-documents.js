'use strict';


/*

CREATE TABLE public."Documents" (
    id integer NOT NULL,
    "originalFileName" character varying(255),
    "fileName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "MedicalReportId" integer
);
*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      originalFileName: {
        type: Sequelize.STRING
      },
      fileName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      MedicalReportId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'MedicalReports'
          },
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Documents');
  }
};
