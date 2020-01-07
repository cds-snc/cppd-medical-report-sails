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
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/

  /**
   * STARTING ROUTES
   */

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
  'GET /en/medical-professional': {
    name: 'medical-professional',
    controller: 'MedicalProfessionalController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/medical-professional',
      fr: '/fr/medical-professional'
    }
  },
  'POST /en/medical-professional': {
    name: 'medical-professional.store',
    controller: 'MedicalProfessionalController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/medical-professional',
      fr: '/fr/medical-professional'
    }
  },
  'GET /en/doctor': { // convenience duplicate of medical-profession
    name: 'doctor',
    controller: 'MedicalProfessionalController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/doctor',
      fr: '/fr/doctor'
    }
  },
  'POST /en/doctor': { // convenience duplicate of medical-profession
    name: 'doctor.store',
    controller: 'MedicalProfessionalController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/doctor',
      fr: '/fr/doctor'
    }
  },

  ... require('./routes/dashboard'),

  ... require('./routes/conditions'),
  ... require('./routes/confirmation'),
  ... require('./routes/consent'),
  ... require('./routes/declaration'),
  ... require('./routes/documents'),
  ... require('./routes/employment'),
  ... require('./routes/expedited'),
  ... require('./routes/health'),
  ... require('./routes/medications'),
  ... require('./routes/personal'),
  ... require('./routes/relationship'),
  ... require('./routes/treatments')
};
