/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Subscription = require('../api/subscription/subscription.model');


Subscription.find({}).remove(function () {
});