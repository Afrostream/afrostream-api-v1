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
  purest.Afrostream.getSecureData('subscriptions/cancel', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.create = function (req, res) {
  purest.Afrostream.postSecureData('subscriptions', req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}