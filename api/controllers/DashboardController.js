/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
function ableToSubmit (sections) {
  return sections.personal &&
         sections.functional &&
         sections.conditions &&
         sections.medications &&
         sections.treatments &&
         sections.futureWork &&
         sections.supportingDocs &&
         sections.declaration;
}

module.exports = {
  index: function(req, res) {
    const sectionsCompleted = {
      personal: true,
      functional: true,
      conditions: false,
      medications: true,
      treatments: true,
      futureWork: false,
      supportingDocs: true,
      declaration: false
    };

    res.view('pages/dashboard', {
      sectionsCompleted: sectionsCompleted,
      ableToSubmit: ableToSubmit(sectionsCompleted)
    });
  }
};
