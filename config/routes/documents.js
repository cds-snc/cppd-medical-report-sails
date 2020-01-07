module.exports = {

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
};
