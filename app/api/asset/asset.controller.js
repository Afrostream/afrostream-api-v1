'use strict';

var purest = require('../../purest/index');

exports.index = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req, 'assets', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  res.cache();
  var path = purest.Afrostream.substitute('assets{0}', req.path);
  purest.Afrostream.getSecureData(req, path, {}, function (err, data, body) {
    if (err) return handleError(res, err);
    res.end(body);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}