# Canada Pension Plan Disability (CPPD) - Medical Report (Form ISP-2519)

[ESDC](https://www.canada.ca/en/employment-social-development.html) and [CDS](https://digital.canada.ca) are working together to make [CPPD](https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-disability-benefit.html) better. We're focused on finding ways to shrink end-to-end processing time without decreasing the quality of decisions. We're currently building a prototype of the CPPD Medical Report as a way to explore some hypotheses and potentially make more of this process online.

For more information, contact us at [cds-snc@tbs-sct.gc.ca](mailto:cds-snc@tbs-sct.gc.ca).

--- 

[ESDC](https://www.canada.ca/en/employment-social-development.html) et la [CDS](https://digital.canada.ca) travaillent ensemble pour améliorer le PPIRPC (programme de prestations d'invalidité du Régime de pensions du Canada). Nous travaillons à trouver des moyens de réduire le temps de traitement de bout en bout sans nuire à la qualité des décisions. Nous mettons actuellement au point un prototype du rapport médical sur le PPPC afin d’explorer certaines hypothèses et d’optimiser davantage ce processus en ligne.

Pour plus d'informations, contactez-nous à l'adresse [cds-snc@tbs-sct.gc.ca](mailto:cds-snc@tbs-sct.gc.ca).

## Built with

- [Sails](https://sailsjs.com/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [VueJS](https://vuejs.org/)
- [Validate.JS](https://validatejs.org/)

## Local development

Quickest way to get started is:

- `npm install`
- `npm run dev`

Note that you can use `sails lift` which will also bring up the server, but `npm run dev` runs with `nodemon`, a better change monitor.

There are additional instructions below for getting started with Docker. See also sections on [Session store](#redis-session-store) and [Database](#database).

## Routing

To support [Node Starter](https://github.com/cds-snc/node-starter-app)-style bilingual routes, we had to modify the way that routing works in Sails. Luckily, Sails provides some really useful ways to modify the underlying framework. As such, we've got a custom [hook](https://sailsjs.com/documentation/concepts/extending-sails/hooks) for routes. The route format is backwards-compatible with the Sails router, and follows this format:

```js
  'GET /en/start': {
    name: 'start',
    controller: 'StartController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/start',
      fr: '/fr/debut'
    }
  },
```

You can also use dynamic route parameters:

```js
  'GET /en/conditions/:id/edit': {
    name: 'conditions.edit',
    controller: 'EditConditionController',
    action: 'edit',
    lang: 'en',
    i18n: {
      en: '/en/conditions/:id/edit',
      fr: '/fr/conditions/:id/modifier'
    }
  },
```

And, of course, all the HTTP verbs you know and love are availabe, such as: `GET`,`POST`,`PUT`,`DELETE`,`PATCH`.

It is also possible to target SailsJS Actions instead of Controllers, but we prefer the Controller method, as they are more portable.

### Named routes

We have also added a route helper for use in views so you can reference a route by name and not worry about the users selected language. For example, using the example routes above, if you wanted to link to the `start` route:

```html
<a href="{{ route('start') }}">Start</a>
```

This will generate a link using the user's current language, ie: `/en/start` or `/fr/debut`.

You can pass route parameters in an object as the second argument to the route helper:

```html
<a href="{{ route('conditions.edit', { id: [CONDITION_ID] }) }}">Edit</a>
```

You can also force the language if you need to:

```html
<a href="{{ route('start', { lang: 'fr' }) }}">Début</a>
```

## Controllers

To generate a new Controller, use the sails generator: `sails generate controller test`. This command will generate an empty controller called `TestController.js` in the api/controllers folder.

Controllers can be organized in any number of ways. Typically in MVC frameworks, method names follow a general CRUD-like conventions:

```js
module.exports = {
  index: function (req, res) { ... },
  create: function (req, res) { ... },
  store: function (req, res) { ... },
  edit: function (req, res) { ... },
  update: function (req, res) { ... },
  delete: function (req, res) { ... },
};
```

The avid reader will notice that we've further divided our controllers up - this is a completely optional way of working, but we find more controllers with less code more readable/manageable.

## Redis session store

Currently, the application data is stored in the session, and the default session store is in memory which clears out every time the process restarts. It can get annoying pretty quickly in development when the session store gets cleared out every time you make a change to a file.

To mitigate this, you can configure Redis as a persistent session store. If you've already got it running locally, say with homebrew, it's pretty easy to configure by setting an environment variable:

- `cp .env.example .env`
- there is no step two (see note)

**Note**: If you're running Redis on a non-standard port, or somewhere other than localhost, then you can set `SESSION_ADAPTER_URL` in that `.env` file.

## Database

Detailed instructions to follow, but the database is Postgres, and we use [Sequelize](https://sequelize.readthedocs.io/en/v3/) for Models and Migrations in the application.

## Docker

These instructions are optimized for development at the moment, rather than production runs.

### This App Only

#### Build

1. Navigate into a cloned copy of this repo
1. `docker build -t cdssnc/cppd-medical-report-sails .`

#### Run

1. `docker run -it --rm -p 1337:1337 cdssnc/cppd-medical-report-sails`

## Dev Container + Database (Docker Compose)

This maps your local files into a Docker container and spins up a PostgreSQL database. This app runs on port `1337` and the database at port `5432` and username `postgres`, both are accessible at `localhost`.

### Run

1. Launch the application `docker compose up`
1. Setup the database: `npm run db:migrate`

When you want to stop both, you can hit `CTRL` + `D` in the terminal that launched it.
