/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': '/en/start', // redirect to start

  'GET /en/start': {
    name: 'start',
    controller: 'StartController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/start',
      fr: '/fr/debut'
    }
  },

  /**
   * PERSONAL ROUTES
   */
  'GET /en/personal': {
    name: 'personal',
    controller: 'PersonalController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/personal',
      fr: '/fr/personnel'
    }
  },

  'POST /en/personal': {
    name: 'personal.store',
    controller: 'PersonalController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/personal',
      fr: '/fr/personnel'
    }
  },

  /**
   * CONDITIONS ROUTES
   */
  'GET /en/conditions': {
    name: 'conditions',
    controller: 'ConditionsController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/conditions',
      fr: '/fr/conditions'
    }
  },

  'GET /en/conditions/add': {
    name: 'conditions.add',
    controller: 'AddConditionController',
    action: 'create',
    lang: 'en',
    i18n: {
      en: '/en/conditions/add',
      fr: '/fr/conditions/ajouter'
    }
  },

  'POST /en/conditions/add': {
    name: 'conditions.store',
    controller: 'AddConditionController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/conditions/add',
      fr: '/fr/conditions/ajouter'
    }
  },

  'GET /en/conditions/:id/edit': {
    name: 'conditions.edit',
    controller: 'EditConditionController',
    action: 'edit',
    lang: 'en',
    i18n: {
      en: '/en/conditions/:id/edit',
      fr: '/fr/conditions/:id/modifier'
    }
  },

  'POST /en/conditions/:id/edit': {
    name: 'conditions.update',
    controller: 'EditConditionController',
    action: 'update',
    lang: 'en',
    i18n: {
      en: '/en/conditions/:id/edit',
      fr: '/fr/conditions/:id/modifier'
    }
  },

  'POST /en/conditions/:id/delete': {
    name: 'conditions.delete',
    controller: 'DeleteConditionController',
    action: 'delete',
    lang: 'en',
    i18n: {
      en: '/en/conditions/:id/delete',
      fr: '/fr/conditions/:id/delete'
    }
  },

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

  /**
   * HEALTH ROUTES
   */
  'GET /en/health': {
    name: 'health',
    controller: 'HealthController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/health',
      fr: '/fr/health'
    }
  },

  'POST /en/health': {
    name: 'health.store',
    controller: 'HealthController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/health',
      fr: '/fr/health'
    }
  },

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

  /**
   * CONSENT ROUTES
   */
  'GET /en/consent': {
    name: 'consent',
    controller: 'ConsentController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/consent',
      fr: '/fr/consent'
    }
  },

  'POST /en/consent': {
    name: 'consent.store',
    controller: 'ConsentController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/consent',
      fr: '/fr/consent'
    }
  },

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

  /**
   * EXPEDITED ROUTES
   */
  'GET /en/expedited': {
    name: 'expedited',
    controller: 'ExpeditedController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/expedited',
      fr: '/fr/expedited'
    }
  },

  'POST /en/expedited': {
    name: 'expedited.store',
    controller: 'ExpeditedController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/expedited',
      fr: '/fr/expedited'
    }
  },

  // example route with params
  'GET /en/product/:id': {
    name: 'getProduct',
    controller: 'ProductController',
    action: 'show',
    lang: 'en',
    i18n: {
      en: '/en/product/:id',
      fr: '/fr/produit/:id'
    }
  }

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
