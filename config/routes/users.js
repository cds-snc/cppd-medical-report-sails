module.exports.routes = {
  '/admin': '/en/users',

  'GET /en/users': {
    name: 'users',
    controller: 'UserManagementController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/users',
      fr: '/fr/users'
    }
  },

  'GET /en/users/create': {
    name: 'users.create',
    controller: 'UserManagementController',
    action: 'create',
    lang: 'en',
    i18n: {
      en: '/en/users/create',
      fr: '/fr/users/create'
    }
  },

  'POST /en/users': {
    name: 'users.store',
    controller: 'UserManagementController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/users',
      fr: '/fr/users'
    }
  },

  'GET /en/users/:id': {
    name: 'users.edit',
    controller: 'UserManagementController',
    action: 'edit',
    lang: 'en',
    i18n: {
      en: '/en/users/:id',
      fr: '/fr/users/:id'
    }
  },
};
