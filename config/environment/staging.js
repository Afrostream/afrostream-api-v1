'use strict';

// Development specific configuration
// ==================================
module.exports = {
  allowOrigin: {
    url: process.env.ALLOW_URL
  },
  afrostream: {
    apiSecret: process.env.AFROSTREAM_API_SECRET,
    apiKey: process.env.AFROSTREAM_API_KEY
  },
  backend: {
    protocol: 'https',
    authority: process.env.BACKEND_AUTHORITY || 'afr-back-end-staging.herokuapp.com'
  }
};