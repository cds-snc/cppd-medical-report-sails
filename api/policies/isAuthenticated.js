module.exports = async function (req, res, next) {
  if (!req.session.user) {
    return res.redirect(sails.route('login'));
  }

  return next();
};
