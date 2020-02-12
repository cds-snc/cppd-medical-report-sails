module.exports = async function (req, res, next) {
  if (req.session.user && req.session.user !== null) {
    return next();
  }

  res.redirect(sails.route('login'));
};
