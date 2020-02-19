module.exports.routes = {
  '/admin': '/en/users',

  'GET /en/users': {
    name: 'users',
    controller: 'UserManagementController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/admin/users',
      fr: '/fr/admin/users'
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
};
