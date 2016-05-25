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
