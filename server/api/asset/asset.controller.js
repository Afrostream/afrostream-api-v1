'use strict';

var purest = require('../../components/purest/index');
var _ = require('lodash');
var zlib = require('zlib');
var path = require('path');
var fs = require('fs');

exports.index = function (req, res) {
  purest.Afrostream.getData('assets', {}, function (err, data) {
    if (err) return handleError(res, err);
    res.json(200, data);
  });
};

exports.show = function (req, res) {
  purest.Afrostream.getData('assets/{0}', {id: req.params.id}, function (err, data) {
    if (err) return handleError(res, err);
    res.send(200, data);
  });
};

exports.showToken = function (req, res) {
  var path = purest.Afrostream.substitute('assets{0}', req.path);
  console.log(path)
  //res.writeHead(500);
  //res.end();
  //return;
  purest.Afrostream.getVideo(path, {}, function (err, data, body) {
    if (err) return handleError(res, err);
    //console.log(data.request.uri.href)
    if (body) {
      console.log('readFile')
      res.end(body);
    } else {
      console.log('emptly playlist');
      res.writeHead(500);
      res.end();
    }
    //res.redirect(data.request.uri.href);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}