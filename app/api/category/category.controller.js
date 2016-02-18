'use strict';

var backend = require('../../backend');

exports.index = function (req, res) {
  res.cache();
  backend.getData(req, '/api/categorys').nodeify(backend.fwd(res));
};

exports.show = function (req, res) {
  res.cache();
  backend.getData(req, '/api/categorys/'+req.params.id).nodeify(backend.fwd(res));
};

exports.spots = function (req, res) {
  res.cache();
  backend.getData(req, '/api/categorys/'+req.params.id+'/spots').nodeify(backend.fwd(res));
};

exports.mea = function (req, res) {
  res.cache();
  backend.getData(req, '/api/categorys/meas').nodeify(backend.fwd(res));
};

exports.allSpots = function (req, res) {
  res.cache();
  backend.getData(req, '/api/categorys/spots').nodeify(backend.fwd(res));
};

exports.menu = function (req, res) {
  res.cache();
  backend.getData(req, '/api/categorys/menu').nodeify(backend.fwd(res));
};
