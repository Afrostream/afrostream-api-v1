'use strict';

var purest = require('../../purest/index');

exports.index = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req,'episodes', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req,'episodes/{0}', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.search = function (req, res) {
  res.isDynamic();
  purest.Afrostream.postSecureData(req,'episodes/search', req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}