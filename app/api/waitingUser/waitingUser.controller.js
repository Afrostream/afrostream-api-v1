'use strict';

var backend = require('../../backend');

exports.create = function (req, res) {
  backend.postData(req, '/api/waitingUsers').nodeify(backend.fwd(res));
};
