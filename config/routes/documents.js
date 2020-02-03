module.exports.routes = {
  /**
   * SUPPORTING DOCUMENTS ROUTES
   */
  'GET /en/documents': {
    name: 'documents',
    controller: 'DocumentsController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/documents',
      fr: '/fr/documents'
    }
  },

  'POST /en/documents': {
    name: 'documents.store',
    controller: 'DocumentsController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/documents',
      fr: '/fr/documents'
    }
  },

  'GET /en/documents/:id': {
    name: 'documents',
    controller: 'DocumentsController',
    action: 'get',
    lang: 'en',
    i18n: {
      en: '/en/documents/:id',
      fr: '/fr/documents/:id'
    }
  },
};
