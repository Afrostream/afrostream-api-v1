'use strict';

var backend = require('../../backend');

exports.checkAuth = function (req, res) {
  backend.getData(req, '/auth/geo/').nodeify(backend.fwd(res));
};
