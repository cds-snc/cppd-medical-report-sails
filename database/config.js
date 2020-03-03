require('dotenv').config();

module.exports = {
  'development': {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres',
    'operatorsAliases': 'false'
  },
  'testing': {
    'dialect': 'sqlite',
    'storage': 'database.sqlite',
    'operatorsAliases': 'false'
  }
};
