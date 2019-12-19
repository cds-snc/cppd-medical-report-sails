/**
 * AddConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    sails.log.info('conditions.add');
    res.view('pages/conditions/add');
  },

  store: function (req, res) {

  }
};

