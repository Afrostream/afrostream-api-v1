'use strict';

const Client = require('afrostream-node-client-backend');

const config = require('./config');

const clients = new Map();

module.exports.getClient = function create(req) {
  let baseUrl;

  if (req.features.isEnabled('api-v1.backend-base-url')) {
    baseUrl = req.features.getVariant('api-v1.backend-base-url');
  } else if (req.features.isEnabled('api-v1.backend-pr') &&
             req.features.getVariant('api-v1.backend-pr').match(/^[\d]+$/)) {
    baseUrl = 'https://afrostream-backend-pr-'+req.features.getVariant('api-v1.backend-pr');
  } else {
    baseUrl = null;
  }
  if (!clients.has(baseUrl)) {
    clients.set(baseUrl, new Client({
      apiKey: config.backendApiKey,
      apiSecret: config.backendApiSecret,
      baseUrl: baseUrl
    }))
  }
  return clients.get(baseUrl);
};
