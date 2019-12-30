/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const defaultPolicies = ['localize', 'route', 'flash'];
const defaultPlusReportExists = ['localize', 'route', 'flash', 'reportExists'];

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  '*': defaultPolicies,

  ConditionsController: {
    'index': defaultPlusReportExists,
  },
  
  AddConditionController: {
    'create': defaultPlusReportExists,
  },

  AddMedicationController: {
    'create': defaultPlusReportExists,
  },

  AddTreatmentController: {
    'create': defaultPlusReportExists,
  },

  ConsentController: {
    'index': defaultPlusReportExists,
  },

  DeclarationController: {
    'index': defaultPlusReportExists,
  },

  DocumentsController: {
    'index': defaultPlusReportExists,
  },

  EmploymentController: {
    'index': defaultPlusReportExists,
  },

  ExpeditedController: {
    'index': defaultPlusReportExists,
  },

  HealthController: {
    'index': defaultPlusReportExists,
  },

  MedicationsController: {
    'index': defaultPlusReportExists,
  },

  RelationshipController: {
    'index': defaultPlusReportExists,
  },

  TreatmentsController: {
    'index': defaultPlusReportExists,
  },
};
