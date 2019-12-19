/**
 * ConditionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index: function (req, res) {
        sails.log.info('conditions.index');
        if (!_.has(req.session.medicalReport, 'conditions')) {
            res.redirect(sails.route('conditions.add'));
        }
    }

};

