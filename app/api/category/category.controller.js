'use strict';

var purest = require('../../purest/index');

exports.index = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req, 'categorys', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req, 'categorys/{0}', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.spots = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req, 'categorys/{0}/spots', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.mea = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req, 'categorys/meas', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.allSpots = function (req, res) {
  res.cache();
  purest.Afrostream.getSecureData(req, 'categorys/spots', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.menu = function (req, res) {
  res.cache();
  purest.Afrostream.menu(req, {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}