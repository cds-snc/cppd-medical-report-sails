module.exports.routes = {
  /**
   * SESSIONS ROUTES
   */
  'GET /en/sessions': {
    name: 'sessions',
    controller: 'SessionsController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/sessions',
      fr: '/fr/sessions'
    }
  },

  'GET /en/sessions/:session/view': {
    name: 'sessions.view',
    controller: 'SessionsController',
    action: 'view',
    lang: 'en',
    i18n: {
      en: '/en/sessions/:session/view',
      fr: '/fr/sessions/:session/view'
    }
  },
};
