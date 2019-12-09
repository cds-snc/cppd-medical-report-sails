module.exports = function (req, res, next) {
    const locales = sails.config.i18n.locales;

    // move this out to a policy that has access to req.getLocale()?
    sails.route = (routeName, ...parametersValues) => {
        let route = sails.router.namedRoutes[routeName][req.getLocale()]

        if (!route) {
            throw new Error('No named route : ' + routeName + '\n Maybe you missed the name property?')
        }

        let parameters = route.match(new RegExp(/:[a-zA-Z_]+/, 'g'))

        if (parameters) {
            let parametersLength = parameters.length
            let valuesLength = parametersValues.length

            if (parametersLength !== valuesLength) {
                console.warn('Length of named parameters (' + parametersLength + ') is not the same as the length of values ' + valuesLength + ' ')
            }

            for (let i = 0; i < parametersLength; ++i) {
                route = route.replace(parameters[i], parametersValues[i])
            }
        }

        return route
    }

    res.locals.route = sails.route
    next();
};
