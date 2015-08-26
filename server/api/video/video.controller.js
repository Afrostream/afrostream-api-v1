'use strict';

var purest = require('../../components/purest/index');
var _ = require('lodash');
var express = require('express');
var app = express(); // the main app

exports.index = function (req, res) {
  purest.Afrostream.getData('videos', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  purest.Afrostream.getData('videos/{0}', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    //data.sources = _.forEach(data.sources, function (source) {
    // _.partialRight(source.src, '//api.afrostream.tv/')
    //source.src = req.protocol + '://' + req.get('host') + '/api' + source.src;
    //});
    res.json(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}