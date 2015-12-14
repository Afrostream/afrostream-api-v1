'use strict';

var purest = require('../../purest/index');

exports.me = function (req, res) {
  purest.Afrostream.getSecureData(req, 'subscriptions/me', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.all = function (req, res) {
  purest.Afrostream.getSecureData(req, 'subscriptions/all', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.billing = function (req, res) {
  purest.Afrostream.getSecureData(req, 'subscriptions/billing', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.cancel = function (req, res) {
  purest.Afrostream.getSecureData(req, 'subscriptions/cancel', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.status = function (req, res) {
  purest.Afrostream.getSecureData(req, 'subscriptions/status', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.create = function (req, res) {
  purest.Afrostream.postSecureData(req, 'subscriptions', req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.gift = function (req, res) {
  purest.Afrostream.postSecureData(req, 'subscriptions/gift', req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {

  if (err === 'Unauthorized') {
    return res.send(401, err);

    //TODO: contact recurly about the below error,
    //seems they do not properly validate the coupon code before we call the api.
  } else if (typeof err[0] !== 'undefined' &&

      typeof err[0]['field'] !== 'undefined' &&
      typeof err[0]['symbol'] !== 'undefined' &&
      err[0]['field'] === 'subscription.coupon_code' &&
      err[0]['symbol'] === 'invalid') {

    //return res.send(403, err);
  }
  return res.send(500, err);
}