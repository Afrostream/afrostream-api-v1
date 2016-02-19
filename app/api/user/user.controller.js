'use strict';

var backend = require('../../backend');

exports.info = function (req, res) {
  backend.getData(req, '/api/users/me').nodeify(backend.fwd(res));
};

exports.history = function (req, res) {
  backend.getData(req, '/api/users/me/history').nodeify(backend.fwd(res));
};