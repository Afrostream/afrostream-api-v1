'use strict';

var backend = require('../../backend');

exports.index = function (req, res) {
  res.cache();
  backend.getData(req, '/api/movies').nodeify(backend.fwd(res));
};

exports.show = function (req, res) {
  res.cache();
  backend.getData(req, '/api/movies/'+req.params.id).nodeify(backend.fwd(res));
};

exports.seasons = function (req, res) {
  res.cache();
  backend.getData(req, '/api/movies/'+req.params.id+'/seasons').nodeify(backend.fwd(res));
};

exports.search = function (req, res) {
  res.isDynamic();
  backend.postData(req, '/api/movies/search').nodeify(backend.fwd(res));
};