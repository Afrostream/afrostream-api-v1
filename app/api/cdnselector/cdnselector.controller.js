'use strict';

var backend = require('../../backend');

exports.getList = function (req, res) {
  res.noCache();
  backend.getData(req, '/api/cdnselector/list').nodeify(backend.fwd(res));
};
