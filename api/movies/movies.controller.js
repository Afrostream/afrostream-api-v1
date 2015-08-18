'use strict';

var purest = require('../../components/purest');

exports.index = function (req, res) {
  purest.Afrostream.movies({}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  purest.Afrostream.movies({id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}