'use strict';

var backend = require('../../../backend');

exports.show = function (req, res) {
  backend.getData(req, '/api/users/' + req.params.userId + '/videos/' + req.params.videoId).nodeify(backend.fwd(res));
};

exports.update = function (req, res) {
  backend.putData(req, '/api/users/' + req.params.userId + '/videos/' + req.params.videoId).nodeify(backend.fwd(res));
};
