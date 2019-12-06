module.exports = function(req, res, next) {
  const locales = sails.config.i18n.locales;
  if (locales.includes(req.param("lang"))) {
    req.setLocale(req.param("lang"));
    return next();
  }
  next();
};
