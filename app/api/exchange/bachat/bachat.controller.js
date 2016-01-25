'use strict';

var backend = require('../../../backend');

exports.customers = function (req, res) {
  res.noCache();
  backend.postData(req, '/api/exchanges/bachat/customers').nodeify(backend.fwd(res));
};

exports.subscriptions = function (req, res) {
  res.noCache();
  backend.postData(req, '/api/exchanges/bachat/subscriptions').nodeify(backend.fwd(res));
};

exports.refunds = function (req, res) {
  res.noCache();
  backend.postData(req, '/api/exchanges/bachat/refunds').nodeify(backend.fwd(res));
};
