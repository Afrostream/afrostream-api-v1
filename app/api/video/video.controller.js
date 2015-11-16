'use strict';

var purest = require('../../purest/index');
var express = require('express');

exports.index = function (req, res) {
  purest.Afrostream.getSecureData(req,'videos', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  purest.Afrostream.getSecureData(req,'videos/{0}', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.set('Cache-Control', 'public, max-age=0');
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}