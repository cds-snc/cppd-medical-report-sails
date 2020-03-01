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

We have reused the nunjucks templates, SASS and related files from [Node Starter](https://github.com/cds-snc/node-starter-app).

## Local development

Quickest way to get started is:

- `npm install`
- `npm run dev`

Note that you can use `sails lift` which will also bring up the server, but `npm run dev` runs with `nodemon`, for better file change monitoring.

There are additional instructions below for getting started with Docker. See also sections on [Session store](#redis-session-store) and [Database](#database).

## Routing

To support [Node Starter](https://github.com/cds-snc/node-starter-app)-style bilingual routes, we had to modify the way that routing works in Sails. Luckily, Sails provides some really useful ways to modify the underlying framework. As such, we've created a custom [hook](https://sailsjs.com/documentation/concepts/extending-sails/hooks) for routes.

Routes are defined in `config/routes.js`.  The route format is backwards-compatible with the Sails router, and follows this format:

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

It is also possible to target SailsJS Actions instead of Controllers, but we prefer using Controllers, as they are more portable.

### Named routes

We have also added a route helper for use in views (or `res.locals`) or controllers (on the `sails` object) so you can reference a route by name and not worry about the user's selected language. For example, using the example routes above, if you wanted to link to the `start` route:

```html
<a href="{{ route('start') }}">Start</a>
```

or in a controller:

```js
res.redirect(sails.route('start'));
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

Controllers can be organized in any number of ways. Typically in MVC frameworks, method names follow general "resourceful" conventions:

```js
module.exports = {
  index: function (req, res) { ... },
  create: function (req, res) { ... },
  store: function (req, res) { ... },
  show: function (req, res) { ... },
  edit: function (req, res) { ... },
  update: function (req, res) { ... },
  delete: function (req, res) { ... },
};
```

The avid reader will notice that we've further divided our controllers up - this is a completely optional way of working, but we find more controllers with less code more readable/manageable.

## Request validation

In order to enable validation in the controllers, we have added the [validate.js](https://validatejs.org/) package, along with a custom hook. To validate a request, create a schema file in `api/schemas`. See the [Validate.JS](https://validatejs.org/) documentation for details, but the simplest example to validate the presence of a field is:

```js
module.exports = {
  conditionName: {
    presence: {
      allowEmpty: false,
      message: '^errors.name_of_condition.length'
    }
  },
}
```

Then, in your controller on the POST method (save or update), you can pass the request through the `validate` helper along with the schema, and then do something based on the result:

```js
let valid = req.validate(req, res, require('../schemas/condition.schema'));

if (valid) {
  // do something
}
```

If the request fails validation, the validator will redirect the user back to their previous location. In addition, all of the validation errors and the form data will be flashed to the session. Errors will then be made available to the view as local variable `errors`, and the data will be available to the view as `data`.

## Session store

There are two Session stores available. The default store is the application database. This is simple and will probably be fine for the forseeable future, but eventually may want to move to either a separate database instance, or a Redis instance.

There is a `session` model in the Models folder. This model is just there to easily create the table required by the session store in development. This should be replaced by a database migration in the future, and that model should be removed.

To use the database session store, make sure your .env file contains the following configuration:

```sh
SESSION_ADAPTER="connect-pg-simple"
```

There is an example of how to setup a Redis session store in the .env.example file.

## Database

Detailed instructions to follow, but the database is Postgres, and we use [Sequelize](https://sequelize.readthedocs.io/en/v3/) for Models and Migrations in the application.

## Docker

These instructions are optimized for development at the moment, rather than production runs.

### This App Only

#### Build

1. Navigate into a cloned copy of this repo
1. `docker build -t cdssnc/cppd-medical-report-sails-dev ./Dockerfile.dev`

#### Run

1. `docker run -it --rm -p 1337:1337 cdssnc/cppd-medical-report-sails-dev`

### Dev Container + Database (Docker Compose)

This maps your local files into a Docker container, spins up a PostgreSQL database, and uses Redis for session storage. The app runs on port `1337`, the database at port `5432` and username `postgres`, session stores on port `6379`, and all are accessible at `localhost`.

### Run

1. Build/fetch containers: `docker-compose build`
1. Launch the application `docker-compose up`
1. Setup the database: `npm run db:migrate`

When you want to stop both, you can hit `CTRL` + `D` in the terminal that launched it.

### Using with VSCode Remote Containers

This lets your development environment in the Docker image that resembles production. It'll run both the database and session storage too.

1. Start Docker locally
1. Install the [Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
1. Restart VSCode, opening it into this code base
1. Open the command prompt (macOS: CMD+SHIFT+P, Win: CTRL+SHIFT+P), and choose `Remote-Containers: Reopen in Container`
1. Choose `From docker-compose.yml`, then `web` (this might take a little bit of time at first start)
1. After it fully starts up, use the terminal embedded inside of VSCode to issue commands within the main container
1. Run to set things up `npm install && npm run db:migrate && npm run db:seed`
1. Run `npm run dev` to start the server
  - To run automated tests after the server is up, use `npx cypress run`