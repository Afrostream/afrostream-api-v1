'use strict';

var backend = require('../../backend');

exports.showInternalplans = function (req, res) {
  backend.getData(req, '/api/billings/internalplans').nodeify(backend.fwd(res));
};

exports.createSubscriptions = function (req, res) {
  backend.postData(req, '/api/billings/subscriptions').nodeify(backend.fwd(res));
};

exports.createGift = function (req, res) {
  backend.postData(req, '/api/billings/gifts').nodeify(backend.fwd(res));
};

exports.validateCoupon = function (req, res) {
  backend.getData(req, '/api/billings/coupons').nodeify(backend.fwd(res));
};

exports.createCoupon = function (req, res) {
  backend.postData(req, '/api/billings/coupons').nodeify(backend.fwd(res));
};

exports.getCouponCampains = function (req, res) {
  backend.getData(req, '/api/billings/couponscampaigns').nodeify(backend.fwd(res));
};

exports.cancelSubscriptions = function (req, res) {
  backend.putData(req, '/api/billings/subscriptions/' + req.params.subscriptionUuid + '/cancel').nodeify(backend.fwd(res));
};
