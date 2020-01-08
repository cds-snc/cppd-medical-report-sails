module.exports = function (req, res, next) {
  /**
   * If there are errors or data flashed to the session
   * assign them to local variables in the template.
   * Note that connect-flash pushes values onto a
   * queue/array, hence the _.first() helpers
   */
  if (_.has(req.session, 'flash')) {
    if (_.has(req.session.flash, 'errors')) {
      res.locals.errors = _.first(req.flash('errors'));
    }

    // Page-level errors (like a holistically invalid form submission, such as a bad login)
    if (_.has(req.session.flash, 'error')) { 
      res.locals.error = _.first(req.flash('error'));
    }

    if (_.has(req.session.flash, 'data')) {
      res.locals.data = _.first(req.flash('data'));
    }
  }
  next();
};
