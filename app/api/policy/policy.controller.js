'use strict';

var backend = require('../../backend');

exports.index = function (req, res) {
  res.cache();
  backend.getData(req, '/api/policy').nodeify(backend.fwd(res));
};