'use strict';

const Client = require('afrostream-node-client-backend');

const config = require('./config');

const clients = new Map();

module.exports.getClient = function create(baseUrl) {
  if (!clients.has(baseUrl)) {
    clients.set(baseUrl, new Client({
      apiKey: config.backendApiKey,
      apiSecret: config.backendApiSecret,
      baseUrl: baseUrl
    }))
  }
  return clients.get(baseUrl);
};
