'use strict';

// Development specific configuration
// ==================================
module.exports = {
  port: process.env.PORT || 3002,
  allowOrigin: {
    url: 'http://localhost:3000'
  },
  afrostream: {
    apiSecret: '3dc3cae6-9c79-487a-9e0f-712be857dcee',
    apiKey: '8c261045-89a3-44bb-af38-65a847269605'
  }
};