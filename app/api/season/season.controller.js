'use strict';

var backend = require('../../backend');

exports.index = function (req, res) {
  res.cache();
  backend.getData(req, '/api/seasons').nodeify(backend.fwd(res));
};

exports.show = function (req, res) {
  res.cache();
  backend.getData(req, '/api/seasons/' + req.params.id).nodeify(backend.fwd(res));
};

exports.search = function (req, res) {
  res.isDynamic();
  backend.postData(req, '/api/seasons/search').nodeify(backend.fwd(res));
};
