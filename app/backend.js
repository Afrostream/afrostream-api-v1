'use strict';

var config = require('../config');

var Client = require('afrostream-node-client-backend');

var client = new Client({
  apiKey: config.afrostream.apiKey,
  apiSecret: config.afrostream.apiSecret
});

module.exports = client;