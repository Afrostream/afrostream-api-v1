'use strict';

var backend = require('../../backend');

exports.index = function (req, res) {
  res.cache();
  backend.getData(req, '/api/episodes').nodeify(backend.fwd(res));
};

exports.show = function (req, res) {
  res.cache();
  backend.getData(req, '/api/episodes/'+req.params.id).nodeify(backend.fwd(res));
};

exports.search = function (req, res) {
  res.isDynamic();
  backend.getData(req, '/api/episodes/search').nodeify(backend.fwd(res));
};
