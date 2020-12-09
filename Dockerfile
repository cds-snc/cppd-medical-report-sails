FROM node:12-alpine3.11 AS base

# Versions
# ARG NODE_VERSION=12.14.0 # Alpine 3.11 tracks NodeJS 12.x LTS
# ARG NPM_VERSION=6.13.4 # Alpine 3.11 tracks NPM 6.x

ARG SAILS_VERISON=^1.0.0
WORKDIR /app

# Need to install python to compile bcrypt dependency
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

# Package files
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

FROM node:12-alpine3.11 AS final
WORKDIR /app

# Install SailsJS
RUN npm install sails@${SAILS_VERISON} -g

COPY . /app/
COPY --from=base /app/node_modules /app/node_modules

ADD https://www.digicert.com/CACerts/BaltimoreCyberTrustRoot.crt.pem ./

# Run the app in dev mode
EXPOSE  1337

CMD npm run dev

### TODO Make this production ready later, right now runs in DEV mode
# CMD node app.js --prod
