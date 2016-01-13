'use strict';

var backend = require('../../backend');

exports.checkAuth = function (req, res) {
  res.noCache();
  backend.getData(req, '/auth/facebook/').nodeify(backend.fwd(res));
};
