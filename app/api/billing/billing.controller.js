'use strict';

var backend = require('../../backend');

exports.showInternalplans = function (req, res) {
  backend.getData(req, '/api/billings/internalplans').nodeify(backend.fwd(res));
};

exports.createSubscriptions = function (req, res) {
  backend.postData(req, '/api/billings/subscriptions').nodeify(backend.fwd(res));
};

exports.createGift = function (req, res) {
  backend.postData(req, '/api/billings/gift').nodeify(backend.fwd(res));
};

exports.cancelSubscriptions = function (req, res) {
  backend.putData(req, '/api/billings/subscriptions/' + req.params.subscriptionUuid + '/cancel').nodeify(backend.fwd(res));
};
