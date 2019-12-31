/**
 * EditConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  edit: function (req, res) {
    // redirect back if there are no conditions
    if (!_.has(req.session.medicalReport, 'conditions')) {
      return res.redirect(sails.route('conditions'));
    }

    const condition = req.session.medicalReport.conditions[req.params.id - 1];

    if (!condition) {
      return res.redirect(sails.route('conditions'));
    }

    res.view('pages/conditions/edit', {
      id: req.params.id,
      condition: condition,
      data: req.session.medicalReport
    });
  },

  update: function (req, res) {
    const body = Object.assign({}, req.body);
    delete body._csrf;

    // the conditions array is 0 indexed
    const conditionId = req.params.id - 1;

    // replace the contents of the condition on the array
    req.session.medicalReport.conditions[conditionId] = body;

    res.redirect(sails.route('conditions'));
  }
};

