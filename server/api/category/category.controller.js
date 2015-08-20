'use strict';

var purest = require('../../components/purest/index');

exports.index = function (req, res) {
  purest.Afrostream.getData('categorys', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  purest.Afrostream.getData('categorys/{0}', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.spots = function (req, res) {
  purest.Afrostream.getData('categorys/{0}/spots', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.mea = function (req, res) {
  purest.Afrostream.getData('categorys/meas', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.menu = function (req, res) {
  purest.Afrostream.menu({}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}