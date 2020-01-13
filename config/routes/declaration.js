module.exports.routes = {
  /**
   * DECLARATION ROUTES
   */
  'GET /en/declaration': {
    name: 'declaration',
    controller: 'DeclarationController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/declaration',
      fr: '/fr/declaration'
    }
  },

  'POST /en/declaration': {
    name: 'declaration.store',
    controller: 'DeclarationController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/declaration',
      fr: '/fr/declaration'
    }
  },

};
