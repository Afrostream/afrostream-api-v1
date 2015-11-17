'use strict';

var fs = require('fs');
var path = require('path');

exports.index = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req, 'posts', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req, 'posts/{0}', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}