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

  cookie: {
    name: 'auth',
    domain: '.afrostream.dev', // RFC 2109
    secret: '-=4fr0str34m=-'
  },

  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_SECRET
  },
  recurly: {
    subdomain: process.env.RECURLY_SUB_DOMAIN,
    apiKey: process.env.RECURLY_API_KEY
  },
  afrostream: {
    apiSecret: process.env.AFROSTREAM_API_SECRET,
    apiKey: process.env.AFROSTREAM_API_KEY
  },
  allowOrigin: {
    url: process.env.ALLOW_URL
  },
  backend: {
    protocol: 'https',
    authority: process.env.BACKEND_AUTHORITY || 'afrostream-backend.herokuapp.com'
  }
};
