'use strict';

var purest = require('../../components/purest/index');

exports.info = function (req, res) {
  purest.Afrostream.getSecureData(req,'users/me', function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}