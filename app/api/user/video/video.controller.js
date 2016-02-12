'use strict';

var purest = require('../../../purest/index');

function handleError(res, err) {
  return res.send(500, err);
}

exports.show = function (req, res) {
  purest.Afrostream.getSecureData(req, 'users/' + req.params.userId + '/videos/' + req.params.videoId, {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.update = function (req, res) {
  purest.Afrostream.putSecureData(req, 'users/' + req.params.userId + '/videos/' + + req.params.videoId, req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};
