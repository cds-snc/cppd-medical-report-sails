module.exports.routes = {
  /**
   * SESSIONS ROUTES
   */
  'GET /en/reports': {
    name: 'reports',
    controller: 'ReportsController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/reports',
      fr: '/fr/reports'
    }
  },

  'GET /en/reports/:report/view': {
    name: 'reports.view',
    controller: 'ReportsController',
    action: 'view',
    lang: 'en',
    i18n: {
      en: '/en/reports/:report/view',
      fr: '/fr/reports/:report/view'
    }
  },
  'GET /en/reports/:report/consent': {
    name: 'reports.consent',
    controller: 'ReportsController',
    action: 'showConsent',
    lang: 'en',
    i18n: {
      en: '/en/reports/:report/consent',
      fr: '/fr/reports/:report/consent'
    }
  },
};
