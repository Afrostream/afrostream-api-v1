'use strict';

var config = require('afrostream-node-config');

config.set('development', require('./environment/development.js'));
config.set('test', require('./environment/test.js'));
config.set('staging', require('./environment/staging.js'));
config.set('production', require('./environment/production.js'));

module.exports = config.get();