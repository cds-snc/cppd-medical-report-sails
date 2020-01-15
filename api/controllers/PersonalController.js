/**
 * PersonalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

module.exports = {
  index: async function (req, res) {
    /**
     * If there is an applicationCode in the session,
     * load the report from the database.
     */
    if (req.session.applicationCode) {
      let medicalReport = await MedicalReport.findOne({
        where: {
          applicationCode: req.session.applicationCode
        }
      });

      /**
       * If we're returning to the form with flash data in locals,
       * merge it with the rest of the medicalReport in the session.
       */
      if (res.locals.data) {
        medicalReport = _.merge(res.locals.data, medicalReport);
      }

      return res.view('pages/personal', {
        data: medicalReport
      });
    }

    /**
     * If there's no applicationCode in the session,
     * no need to query the db, just return the view
     */
    return res.view('pages/personal');
  },

  store: async function (req, res) {
    let valid = req.validate(req, res, require('../schemas/personal.schema'));

    if (valid) {
      // if we don't have an applicationCode yet, make one
      if (!req.session.applicationCode) {
        req.session.applicationCode = dataStore.generateApplicationCode();
      }

      // Update existing, or create a new one!
      await MedicalReport.upsert({
        applicationCode: req.session.applicationCode,
        socialInsuranceNumber: req.body.socialInsuranceNumber,
        preferredTitle: req.body.preferredTitle,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        birthLastName: req.body.birthLastName,
        birthdate: req.body.birthdate,
        address: req.body.address,
        telephone: req.body.telephone,
        alternateTelephone: req.body.alternateTelephone,
        contactTime: req.body.contactTime
      });

      res.redirect(sails.route('consent'));
    }
  }
};
