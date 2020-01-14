/**
 * EditConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');
const Documents = require('../utils/DocumentsHelper');

module.exports = {
  edit: function (req, res) {
    // redirect back if there are no conditions
    if (!_.has(req.session.medicalReport, 'conditions')) {
      return res.redirect(sails.route('conditions'));
    }

    let condition = { ...req.session.medicalReport.conditions[req.params.id - 1] };

    if (!condition) {
      return res.redirect(sails.route('conditions'));
    }

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medication from the session.
     */
    if (res.locals.data) {
      condition = _.merge(condition, res.locals.data);
    }

    let documents = Documents.getDocumentsByCondition(req.session.medicalReport, req.params.id - 1).join(',');

    res.view('pages/conditions/edit', {
      id: req.params.id,
      condition: condition,
      medicalReport: req.session.medicalReport,
      documents: documents
    });
  },

  update: function (req, res) {
    const body = Object.assign({}, req.body);
    delete body._csrf;

    // the conditions array is 0 indexed
    const conditionId = req.params.id - 1;


    let valid = false;

    if (require('../../config/featureflags').disableValidation) {
      valid = true;
    } else {
      valid = req.validate(req, res, require('../schemas/condition.schema'));
    }

    if (valid) {
      // replace the contents of the condition on the array
      req.session.medicalReport.conditions[conditionId] = body;

      Documents.saveDocumentsFromCondition(req.session.medicalReport, body);
      dataStore.storeMedicalReport(req.session.medicalReport);

      res.redirect(sails.route('conditions'));
    }
  }
};

