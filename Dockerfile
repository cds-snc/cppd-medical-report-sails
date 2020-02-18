FROM node:lts-alpine3.11

# Versions
# ARG NODE_VERSION=12.14.0 # Alpine 3.11 tracks NodeJS 12.x LTS
# ARG NPM_VERSION=6.13.4 # Alpine 3.11 tracks NPM 6.x
ARG SAILS_VERISON=^1.0.0

# Variables
ENV WORKDIR "/cppd-medical-report-sails"

# Copy in files
WORKDIR ${WORKDIR}

# Install SailsJS
RUN npm install sails@${SAILS_VERISON} -g

# Copy in build files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy in the rest of the files
COPY . ./

# Run the app in dev mode
EXPOSE  1337

CMD npm run dev

### TODO Make this production ready later, right now runs in DEV mode
# CMD node app.js --prod
