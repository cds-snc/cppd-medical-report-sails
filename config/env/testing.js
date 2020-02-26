module.exports = {
  datastores: {
    default: {
      url: '',
      dialect: 'sqlite',
      options: {
        dialect: 'sqlite',
        storage: 'database.sqlite'
      }
    },

  },

  models: {
    migrate: 'alter',
  },

  blueprints: {
    shortcuts: false,
  },

  security: {
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },

  },

  session: {
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },

  sockets: {

  },

  log: {
    level: 'debug'
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
  },

  custom: {
    baseUrl: 'http://localhost:1337',
    internalEmailAddress: 'support@example.com',
  },
};
