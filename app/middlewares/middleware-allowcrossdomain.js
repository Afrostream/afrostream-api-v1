'use strict';

var config = require('../../config/environment');

module.exports = function (options) {
  return function (req, res, next) {
    res.header('Access-Control-Allow-Origin', config.allowOrigin.url);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  };
};