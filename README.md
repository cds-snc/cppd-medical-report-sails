# Canada Pension Plan Disability (CPPD) - Medical Report (Form ISP-2519)

**Demo (`master` branch):** https://cppdmedicalreport-appservice.azurewebsites.net/

[ESDC](https://www.canada.ca/en/employment-social-development.html) and [CDS](https://digital.canada.ca) are working together to make [CPPD](https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-disability-benefit.html) better. We're focused on finding ways to shrink end-to-end processing time without decreasing the quality of decisions. We're currently building a prototype of the CPPD Medical Report as a way to explore some hypotheses and potentially make more of this process online.

For more information, contact us at [cds-snc@tbs-sct.gc.ca](mailto:cds-snc@tbs-sct.gc.ca).

--- 

[ESDC](https://www.canada.ca/en/employment-social-development.html) et la [CDS](https://digital.canada.ca) travaillent ensemble pour améliorer le PPIRPC (programme de prestations d'invalidité du Régime de pensions du Canada). Nous travaillons à trouver des moyens de réduire le temps de traitement de bout en bout sans nuire à la qualité des décisions. Nous mettons actuellement au point un prototype du rapport médical sur le PPPC afin d’explorer certaines hypothèses et d’optimiser davantage ce processus en ligne.

Pour plus d'informations, contactez-nous à l'adresse [cds-snc@tbs-sct.gc.ca](mailto:cds-snc@tbs-sct.gc.ca).

## Local development

Quickest way to get started is:

- `npm install`
- `npm run dev`

Note that you can use `sails lift` which will also bring up the server, but `npm run dev` runs with `nodemon`, a better change monitor.

There are additional instructions below for getting started with Docker.

## Redis session store

Currently, the application data is stored in the session, and the default session store is in memory which clears out every time the process restarts. It can get annoying pretty quickly in development when the session store gets cleared out every time you make a change to a file.

To mitigate this, you can configure Redis as a persistent session store. If you've already got it running locally, say with homebrew, it's pretty easy to configure by setting an environment variable:

- `cp .env.example .env`
- there is no step two (see note)

Note: If you're running Redis on a non-standard port, or somewhere other than localhost, then you can set `SESSION_ADAPTER_URL` in that `.env` file.

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
1. Setup the database: `npm run db:init`

When you want to stop both, you can hit `CTRL` + `D` in the terminal that launched it.