'use strict';

var config = require('../../config');

module.exports = function () {
  return function (req, res, next) {
    res.header('Access-Control-Allow-Origin', config.allowOrigin.url);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Access-Token');
    next();
  };
};