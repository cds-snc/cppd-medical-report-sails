require('dotenv').config();

module.exports = {
  'development': {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres',
    'operatorsAliases': 'false'
  },
  'test': {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres',
    'operatorsAliases': 'false'
  }
};
