let _ = require('@sailshq/lodash')
let detectVerb = require('./lib/detect-verb')

/*
 * This code/concept was adapted from: https://github.com/Melchyore/sails-hook-route
 * The route helper code from that original implementation has been moved out to the 
 * route.js policy/middleware.
 */

module.exports = sails => {
    return {
        configure() {
            let routes = sails.config.routes
            let router = sails.router
            router.namedRoutes = {}
            sails.log.info('Configuring i18n Routes');

            _.forIn(routes, (options, route) => {
                if (_.isObject(options) && _.has(options, 'name')) {
                    let name = options.name
                    let verb = detectVerb(route.toLowerCase()).verb
                    let url = detectVerb(route.toLowerCase()).path
                    let i18nRoutes = options.i18n
                    let defaultLang = options.lang

                    // pull out the i18n routes and add to global routes object
                    _.forIn(i18nRoutes, (path, lang) => {
                        let i18nRoute = {}
                        // no need to add the default(base) route
                        if (lang !== defaultLang) {
                            i18nRoute[verb.toUpperCase() + ' ' + path] = {
                                controller: options.controller,
                                action: options.action,
                                lang: lang,
                                i18n: i18nRoutes
                            }
                            _.assign(sails.config.routes, i18nRoute)
                        }
                    })

                    // create a name-indexed list of routes for easy lookup
                    if (!_.has(router.namedRoutes, name)) {
                        router.namedRoutes[options.name] = i18nRoutes
                    }
                }
            })

            sails.log.info(sails.config.routes);
        },

        // probably don't need this anymore
        initialize(done) {
            sails.log.info("Initializing custom hook (`routes`)")

            return done()
        }
    }
}