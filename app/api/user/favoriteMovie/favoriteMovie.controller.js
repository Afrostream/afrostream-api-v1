'use strict';

var backend = require('../../../backend');

exports.index = function (req, res) {
  backend.getData(req, '/api/users/' + req.params.userId + '/favoritesMovies').nodeify(backend.fwd(res));
};

exports.add = function (req, res) {
  backend.postData(req, '/api/users/' + req.params.userId + '/favoritesMovies').nodeify(backend.fwd(res));
};

exports.remove = function (req, res) {
  backend.deleteData(req, '/api/users/' + req.params.userId + '/favoritesMovies/' + req.params.movieId).nodeify(backend.fwd(res));
};