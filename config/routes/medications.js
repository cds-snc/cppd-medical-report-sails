
module.exports = {
  /**
   * MEDICATIONS ROUTES
   */
  'GET /en/medications': {
    name: 'medications',
    controller: 'MedicationsController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/medications',
      fr: '/fr/medications'
    }
  },

  'GET /en/medications/add': {
    name: 'medications.add',
    controller: 'AddMedicationController',
    action: 'create',
    lang: 'en',
    i18n: {
      en: '/en/medications/add',
      fr: '/fr/medications/ajouter'
    }
  },

  'POST /en/medications/add': {
    name: 'medications.store',
    controller: 'AddMedicationController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/medications/add',
      fr: '/fr/medications/ajouter'
    }
  },

  'GET /en/medications/:id/edit': {
    name: 'medications.edit',
    controller: 'EditMedicationController',
    action: 'edit',
    lang: 'en',
    i18n: {
      en: '/en/medications/:id/edit',
      fr: '/fr/medications/:id/modifier'
    }
  },

  'POST /en/medications/:id/edit': {
    name: 'medications.update',
    controller: 'EditMedicationController',
    action: 'update',
    lang: 'en',
    i18n: {
      en: '/en/medications/:id/edit',
      fr: '/fr/medications/:id/modifier'
    }
  },

  'POST /en/medications/:id/delete': {
    name: 'medications.delete',
    controller: 'DeleteMedicationController',
    action: 'delete',
    lang: 'en',
    i18n: {
      en: '/en/medications/:id/delete',
      fr: '/fr/medications/:id/delete'
    }
  },
}
