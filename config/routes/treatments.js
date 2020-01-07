module.exports = {

  /**
   * TREATMENTS ROUTES
   */
  'GET /en/treatments': {
    name: 'treatments',
    controller: 'TreatmentsController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/treatments',
      fr: '/fr/treatments'
    }
  },

  'GET /en/treatments/add': {
    name: 'treatments.add',
    controller: 'AddTreatmentController',
    action: 'create',
    lang: 'en',
    i18n: {
      en: '/en/treatments/add',
      fr: '/fr/treatments/ajouter'
    }
  },

  'POST /en/treatments/add': {
    name: 'treatments.store',
    controller: 'AddTreatmentController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/treatments/add',
      fr: '/fr/treatments/ajouter'
    }
  },

  'GET /en/treatments/:id/edit': {
    name: 'treatments.edit',
    controller: 'EditTreatmentController',
    action: 'edit',
    lang: 'en',
    i18n: {
      en: '/en/treatments/:id/edit',
      fr: '/fr/treatments/:id/modifier'
    }
  },

  'POST /en/treatments/:id/edit': {
    name: 'treatments.update',
    controller: 'EditTreatmentController',
    action: 'update',
    lang: 'en',
    i18n: {
      en: '/en/treatments/:id/edit',
      fr: '/fr/treatments/:id/modifier'
    }
  },

  'POST /en/treatments/:id/delete': {
    name: 'treatments.delete',
    controller: 'DeleteTreatmentController',
    action: 'delete',
    lang: 'en',
    i18n: {
      en: '/en/treatments/:id/delete',
      fr: '/fr/treatments/:id/delete'
    }
  },
};
