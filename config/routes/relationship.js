module.exports.routes = {
  /**
   * RELATIONSHIP ROUTES
   */
  'GET /en/relationship': {
    name: 'relationship',
    controller: 'RelationshipController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/relationship',
      fr: '/fr/relationship'
    }
  },

  'POST /en/relationship': {
    name: 'relationship.store',
    controller: 'RelationshipController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/relationship',
      fr: '/fr/relationship'
    }
  },

};
