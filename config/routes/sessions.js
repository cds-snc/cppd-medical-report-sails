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

  'GET /en/sessions/:session/download': {
    name: 'sessions.download',
    controller: 'SessionsController',
    action: 'download',
    lang: 'en',
    i18n: {
      en: '/en/sessions/:session/download',
      fr: '/fr/sessions/:session/download'
    }
  },
}