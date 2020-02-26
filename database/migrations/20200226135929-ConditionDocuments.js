'use strict';

/*
CREATE TABLE public."ConditionDocuments" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ConditionId" integer NOT NULL,
    "DocumentId" integer NOT NULL
);

*/
const tableName = 'ConditionDocuments';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {

      ConditionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Conditions'
          },
          key: 'id'
        }
      },
      DocumentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Documents'
          },
          key: 'id'
        }
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(tableName);
  }
};
