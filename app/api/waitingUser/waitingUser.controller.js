'use strict';

var purest = require('../../purest/index');

exports.create = function (req, res) {
  purest.Afrostream.postSecureData(req, 'waitingUsers', req.body, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}