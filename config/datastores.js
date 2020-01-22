/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

const CONNECTION_STRING_REGEX = /^(?<type>.+?):\/\/(?<user>.+?):(?<password>.+)@(?<host>.+?):(?<port>.+?)\/(?<database>.+)$/;

function getDbUser() {
  let connectionStringMatch = CONNECTION_STRING_REGEX.exec(process.env.DATABASE_URL);
  if(connectionStringMatch) {
    return connectionStringMatch.groups.user;
  }
  else if(process.env.DB_USER) {
    return process.env.DB_USER;
  }

  return 'postgres'; // development default
}

function getDbPassword() {
  let connectionStringMatch = CONNECTION_STRING_REGEX.exec(process.env.DATABASE_URL);
  if(connectionStringMatch) {
    return connectionStringMatch.groups.password;
  }
  else if(process.env.DB_PASSWORD) {
    return process.env.DB_PASSWORD;
  }

  return null; // development default
}

function getDbName() {
  let connectionStringMatch = CONNECTION_STRING_REGEX.exec(process.env.DATABASE_URL);
  if(connectionStringMatch) {
    return connectionStringMatch.groups.database;
  }
  else if(process.env.DB_DATABASE) {
    return process.env.DB_DATABASE;
  }

  return 'postgres'; // development default
}

function getDbHost() {
  let connectionStringMatch = CONNECTION_STRING_REGEX.exec(process.env.DATABASE_URL);
  if(connectionStringMatch) {
    return connectionStringMatch.groups.host;
  }
  else if(process.env.DB_HOST) {
    return process.env.DB_HOST;
  }

  return 'postgres'; // development default
}

function getDbPort() {
  let connectionStringMatch = CONNECTION_STRING_REGEX.exec(process.env.DATABASE_URL);
  if(connectionStringMatch) {
    return connectionStringMatch.groups.port;
  }
  else if(process.env.DB_PORT) {
    return process.env.DB_PORT;
  }

  return '5432'; // development default
}

function getDbType() {
  let connectionStringMatch = CONNECTION_STRING_REGEX.exec(process.env.DATABASE_URL);
  if(connectionStringMatch) {
    return connectionStringMatch.groups.type;
  }
  else if(process.env.DB_TYPE) {
    return process.env.DB_TYPE;
  }

  return 'postgres'; // development default
}

module.exports.datastores = {


  /***************************************************************************
  *                                                                          *
  * Your app's default datastore.                                            *
  *                                                                          *
  * Sails apps read and write to local disk by default, using a built-in     *
  * database adapter called `sails-disk`.  This feature is purely for        *
  * convenience during development; since `sails-disk` is not designed for   *
  * use in a production environment.                                         *
  *                                                                          *
  * To use a different db _in development_, follow the directions below.     *
  * Otherwise, just leave the default datastore as-is, with no `adapter`.    *
  *                                                                          *
  * (For production configuration, see `config/env/production.js`.)          *
  *                                                                          *
  ***************************************************************************/

  default: {
    user: getDbUser(),
    password: getDbPassword(),
    database: getDbName(),
    dialect: getDbType(),
    options: {
      dialect: getDbType(),
      host: getDbHost(),
      port: getDbPort(),
      logging: console.log        // or specify sails log level to use ('info', 'warn', 'verbose', etc)
    }
    /***************************************************************************
    *                                                                          *
    * Want to use a different database during development?                     *
    *                                                                          *
    * 1. Choose an adapter:                                                    *
    *    https://sailsjs.com/plugins/databases                                 *
    *                                                                          *
    * 2. Install it as a dependency of your Sails app.                         *
    *    (For example:  npm install sails-mysql --save)                        *
    *                                                                          *
    * 3. Then pass it in, along with a connection URL.                         *
    *    (See https://sailsjs.com/config/datastores for help.)                 *
    *                                                                          *
    ***************************************************************************/
    // adapter: 'sails-mysql',
    // url: 'mysql://user:password@host:port/database',

  },


};
