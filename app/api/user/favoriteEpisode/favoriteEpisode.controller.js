'use strict';

var backend = require('../../../backend');

exports.index = function (req, res) {
  backend.getData(req, '/api/users/' + req.params.userId + '/favoritesEpisodes').nodeify(backend.fwd(res));
};

exports.add = function (req, res) {
  backend.postData(req, '/api/users/' + req.params.userId + '/favoritesEpisodes').nodeify(backend.fwd(res));
};

exports.remove = function (req, res) {
  backend.deleteData(req, '/api/users/' + req.params.userId + '/favoritesEpisodes/' + req.params.episodeId).nodeify(backend.fwd(res));
};