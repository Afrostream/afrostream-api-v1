'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // auth0 details for connecting to dev environment
  auth0: {
    domain: 'afrostream.eu.auth0.com',
    clientId: 'BtSdIqKqfIse0H1dqlpHFJgKIkUG0NpE',
    clientSecret: 'KYmL01KW5HczO-XKpltlVUONRCXtynJQ0nFqiGNOsjN9c3RsBAnr5_T-rnnc7DYY'
  },
  cookie: {
    name: 'auth',
    domain: '.herokuapp.com', // RFC 2109, :( we should have a real staging domain for
    secret: '-=4fr0str34m=-'
  },
  recurly: {
    subdomain: 'johnarch',
    apiKey: '67dbb29f0dbe4e219bc247a3b5387652'
  },
  allowOrigin: {
    url: process.env.ALLOW_URL
  },
  afrostream: {
    apiSecret: process.env.AFROSTREAM_API_SECRET,
    apiKey: process.env.AFROSTREAM_API_KEY
  },
  backend: {
    protocol: 'https',
    authority: 'afr-back-end-staging.herokuapp.com'
  }
};