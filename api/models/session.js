'use strict';

/**
 * This model creates the session table required
 * by our session store middleware. This should
 * be replaced by a migration file in future.
 */
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
