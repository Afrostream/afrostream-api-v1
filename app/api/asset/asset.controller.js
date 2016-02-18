'use strict';

var backend = require('../../backend');

exports.index = function (req, res) {
  res.cache();
  backend.getData(req, '/api/assets').nodeify(backend.fwd(res));
};

exports.show = function (req, res) {
  res.cache();
  backend.getData(req, req.path).nodeify(backend.fwd(res));
};
