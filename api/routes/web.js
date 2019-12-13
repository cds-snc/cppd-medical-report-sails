module.exports = {
    "/": "/en/start", // redirect to start

    "GET /en/start": {
        name: "start",
        controller: "StartController",
        action: "index",
        lang: "en",
        i18n: {
            en: "/en/start",
            fr: "/fr/debut"
        }
    },

    "GET /en/personal": {
        name: "personal",
        controller: "PersonalController",
        action: "index",
        lang: "en",
        i18n: {
            en: "/en/personal",
            fr: "/fr/personnel"
        }
    },

    "POST /en/personal": {
        name: "personal.store",
        controller: "PersonalController",
        action: "store",
        lang: "en",
        i18n: {
            en: "/en/personal",
            fr: "/fr/personnel"
        }
    },

    // example route with params
    "GET /en/product/:id": {
        name: "getProduct",
        controller: "ProductController",
        action: "show",
        lang: "en",
        i18n: {
            en: "/en/product/:id",
            fr: "/fr/produit/:id"
        }
    }
}