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

  'GET /en/declaration/view': {
    name: 'declaration.view',
    controller: 'DeclarationController',
    action: 'view',
    lang: 'en',
    i18n: {
      en: '/en/declaration/view',
      fr: '/fr/declaration/view'
    }
  },

  'GET /en/declaration/:session/view': {
    name: 'declaration.processingView',
    controller: 'DeclarationController',
    action: 'processingView',
    lang: 'en',
    i18n: {
      en: '/en/declaration/:session/view',
      fr: '/fr/declaration/:session/view'
    }
  },

};
