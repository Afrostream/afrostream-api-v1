'use strict';

var purest = require('../../purest/index');

exports.index = function (req, res) {
  purest.Afrostream.getSecureData(req,'seasons', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  purest.Afrostream.getSecureData(req,'seasons/{0}', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.search = function (req, res) {
  purest.Afrostream.postSecureData(req,'seasons/search', req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}