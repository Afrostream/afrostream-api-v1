'use strict';

// Development specific configuration
// ==================================
module.exports = {
  recurly: {
    subdomain: 'johnarch',
    apiKey: '67dbb29f0dbe4e219bc247a3b5387652'
  },
  allowOrigin: {
    url: 'http://localhost:3000'
  },
  afrostream: {
    apiSecret: '3dc3cae6-9c79-487a-9e0f-712be857dcee',
    apiKey: '8c261045-89a3-44bb-af38-65a847269605'
  },
  backend: {
    protocol: 'http',
    authority: 'localhost:9000'
  }
};