/**
 * ConditionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const validate = require('../hooks/validate/validator');
const conditionsSchema = require('../schemas/condition.schema');

/**
 * Will return an array of indicies identifying incomplete conditions.
 * 
 * For example, if `conditions` as [condA, condB, condC] and A and C are incomplete,
 * it'll return [1,3]. 
 * 
 * Indicies start at 1, rather than zero, which lines up with the current way
 * the conditions/index view works.
 * 
 * @param {*} conditions Array of conditions
 */
function getIncompleteConditions(conditions) {
  incompleteConditions = []
  for (let i = 0; i < conditions.length; i++) {
    if ( validate(conditions[i], conditionsSchema) !== undefined ) {
      incompleteConditions.push(i+1);
    }
  }
  return incompleteConditions;
}

module.exports = {
  index: function (req, res) {
    let medicalReport = req.session.medicalReport;
    if (_.has(medicalReport, 'conditions') && medicalReport.conditions.length) {
      let incompleteConditions = getIncompleteConditions(medicalReport.conditions);
      return res.view('pages/conditions/index', {
        data: req.session.medicalReport,
        incompleteConditions: incompleteConditions,
      });
    }

    return res.redirect(sails.route('conditions.add'));
  }
};
