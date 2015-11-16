'use strict';

var purest = require('../../../purest/index');

function handleError(res, err) {
  return res.send(500, err);
}

exports.index = function (req, res) {
  purest.Afrostream.getSecureData(req, 'users/' + req.params.userId + '/favoritesSeasons', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.add = function (req, res) {
  purest.Afrostream.postSecureData(req, 'users/' + req.params.userId + '/favoritesSeasons', req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.remove = function (req, res) {
  purest.Afrostream.deleteSecureData(req, 'users/' + req.params.userId + '/favoritesSeasons/' + req.params.seasonId, req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};