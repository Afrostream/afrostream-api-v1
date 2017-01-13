'use strict';

const Client = require('afrostream-node-client-backend');

const config = require('./config');

const clients = new Map();

module.exports.getClient = function create(req) {
  let baseUrl;

  if (req.features.isEnabled('afrostream-api-v1.backend-base-url')) {
    baseUrl = req.features.getVariant('afrostream-api-v1.backend-base-url');
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
