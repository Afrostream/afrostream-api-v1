'use strict';

var backend = require('../../backend');

exports.showConfig = function (req, res) {
  res.cache();
  backend.getData(req, '/api/player/config').nodeify(backend.fwd(res));
};
