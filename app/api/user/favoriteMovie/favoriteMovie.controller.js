'use strict';

var purest = require('../../../purest/index');

function handleError(res, err) {
  return res.send(500, err);
}

exports.index = function (req, res) {
  if (req.query.afro_token) {
    purest.Afrostream.getSecureData(req, 'users/' + req.params.userId + '/favoritesMovies', {}, function (err, data) {
      if (err) return handleError(res, err);
      res.json(200, data);
    });
  } else {
    handleError(res, 'missing querystring ?afro_token=...')();
  }
};

exports.add = function (req, res) {
  if (req.body.afro_token) {
    purest.Afrostream.postSecureData(req, 'users/' + req.params.userId + '/favoritesMovies', req.body, function (err, data) {
      if (err) return handleError(res, err);
      res.json(200, data);
    });
  } else {
    handleError(res, 'missing postParam afro_token')();
  }
};

exports.remove = function (req, res) {
  if (req.body.afro_token) {
    purest.Afrostream.deleteSecureData(req, 'users/' + req.params.userId + '/favoritesMovies/' + req.params.movieId, req.body, function (err, data) {
      if (err) return handleError(res, err);
      res.json(200, data);
    });
  } else {
    handleError(res, 'missing postParam afro_token')();
  }
};