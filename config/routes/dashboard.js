module.exports.routes = {
  'GET /en/dashboard': {
    name: 'dashboard',
    controller: 'DashboardController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/dashboard',
      fr: '/fr/tabeleaudebord'
    }
  },
  'POST /en/dashboard': {
    name: 'dashboard.ready',
    controller: 'DashboardController',
    action: 'ready',
    lang: 'en',
    i18n: {
      en: '/en/dashboard',
      fr: '/fr/tabeleaudebord'
    }
  }
};
