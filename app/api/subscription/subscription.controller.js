'use strict';

var backend = require('../../backend');

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

exports.coupons = function (req, res) {
  backend.getData(req, '/api/subscriptions/coupon').nodeify(backend.fwd(res));
};