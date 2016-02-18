'use strict';

var backend = require('../../backend');

exports.me = function (req, res) {
  backend.getData(req, '/api/subscriptions/me').nodeify(backend.fwd(res));
};

exports.all = function (req, res) {
  backend.getData(req, '/api/subscriptions/all').nodeify(backend.fwd(res));
};

exports.billing = function (req, res) {
  backend.getData(req, '/api/subscriptions/billing').nodeify(backend.fwd(res));
};

exports.cancel = function (req, res) {
  backend.getData(req, '/api/subscriptions/cancel').nodeify(backend.fwd(res));
};

exports.status = function (req, res) {
  backend.getData(req, '/api/subscriptions/status').nodeify(backend.fwd(res));
};

exports.create = function (req, res) {
  backend.postData(req, '/api/subscriptions/').nodeify(backend.fwd(res));
};

exports.gift = function (req, res) {
  backend.postData(req, '/api/subscriptions/gift').nodeify(backend.fwd(res));
};
