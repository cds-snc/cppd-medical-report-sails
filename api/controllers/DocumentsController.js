/**
 * DocumentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');

module.exports = {
  index: async function (req, res) {
    // Load the report from the database.
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        {
          model: Document,
          as: 'Documents',
          attributes: ['id', 'fileName'],
          include: [
            {
              model: Condition,
              as: 'Conditions',
              attributes: ['id']
            }
          ]
        },
        {
          model: Condition,
          as: 'Conditions',
          attributes: ['id', 'conditionName']
        }
      ]
    });

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      medicalReport = _.merge(res.locals.data, medicalReport);
    }

    res.view('pages/documents', {
      data: medicalReport,
    });
  },

  store: async function (req, res) {
    /**
     * We don't validate here because we need to be able to
     * upload files even if conditions haven't been added yet.
     * Validate on the Dashboard only.
     */

    res.redirect(sails.route('dashboard'));
  },

  get: async function (req, res) {
    let document = await Document.findOne({
      where: {
        id: req.params.id
      }
    });

    const filePath = path.join(process.cwd(), '.tmp/uploads', document.fileName);

    const SkipperDisk = require('skipper-disk');
    const fileAdapter = SkipperDisk();

    res.set('Content-disposition', 'attachment; filename=' + document.originalFileName);

    fileAdapter.read(filePath).pipe(res);
  }
};
