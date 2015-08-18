'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
  process.env.IP ||
  undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.PORT ||
  8080,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
    'mongodb://localhost/afrostream'
  },
  auth0: {
    domain: process.env.AUTH0_URI || 'afrostream.eu.auth0.com',
    clientId: process.env.AUTH0_CLIENT || 'BtSdIqKqfIse0H1dqlpHFJgKIkUG0NpE',
    clientSecret: process.env.AUTH0_SECRET || 'KYmL01KW5HczO-XKpltlVUONRCXtynJQ0nFqiGNOsjN9c3RsBAnr5_T-rnnc7DYY'
  },
  recurly: {
    subdomain: process.env.AUTH0_SUB_DOMAIN || 'johnarch',
    apiKey: process.env.AUTH0_API_KEY || '67dbb29f0dbe4e219bc247a3b5387652'
  },
  allowOrigin: {
    url: 'https://afrostream.tv'
  }
};
