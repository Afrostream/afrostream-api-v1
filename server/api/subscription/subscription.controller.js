'use strict';

var purest = require('../../components/purest/index');

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
  purest.Afrostream.postData(req, 'subscriptions/gifts', req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  if (err === 'Unauthorized') {
    return res.send(401, err);
  }
  return res.send(500, err);
}