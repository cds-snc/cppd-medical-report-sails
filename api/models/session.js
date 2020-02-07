'use strict';

module.exports = {
  attributes: {
    sid: { type: Sequelize.STRING, primaryKey: true },
    sess: Sequelize.JSON,
    expire: Sequelize.DATE,
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
  },
  options: {
    tableName: 'session'
  },
  indexes: [
    {
      unique: true,
      fields: ['sid']
    },
    {
      name: 'IDX_session_expire',
      fields: ['expire']
    }
  ]
};
