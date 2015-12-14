'use strict';

var backend = require('../backend');

exports.drmtodayCallback = function (req, res) {
  res.noCache();
  backend.getDataWithoutAuth(req, '/right/user/'+req.params.userId+'/asset/'+req.params.assetId).nodeify(backend.fwd(res));
};
