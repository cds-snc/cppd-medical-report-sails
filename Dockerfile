FROM alpine:3.11

# Versions
# ARG NODE_VERSION=12.14.0 # Alpine 3.11 tracks NodeJS 12.x LTS
# ARG NPM_VERSION=6.13.4 # Alpine 3.11 tracks NPM 6.x
ARG SAILS_VERISON=^1.0.0

# Variables
ENV WORKDIR "/cppd-medical-report-sails"


# Copy in files
WORKDIR ${WORKDIR}
COPY . .

# Install NodeJS and NPM (which tracks NodeJS 12.x / NPM 6.x in Alpine 3.11)
RUN apk add --update nodejs npm

# Install SailsJS
RUN npm install sails@${SAILS_VERISON} -g

# Install dependencies
RUN npm install 

# Run the app!
CMD sails lift
### TODO Make this production ready later, right now runs in DEV mode
# CMD node app.js --prod