'use strict';

var backend = require('../../backend');

exports.index = function (req, res) {
  backend.getData(req, '/api/videos/').nodeify(backend.fwd(res));
};

exports.show = function (req, res) {
  backend.getData(req, '/api/videos/' + req.params.id).nodeify(backend.fwd(res));
};