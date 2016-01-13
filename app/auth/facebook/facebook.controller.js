'use strict';

var backend = require('../../backend');

exports.checkAuth = function (req, res) {
  res.noCache();
  backend.getDataWithoutAuth(req, '/auth/facebook/', {followRedirect: false}).nodeify(backend.fwd(res));
};
