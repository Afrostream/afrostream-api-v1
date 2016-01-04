'use strict';

var compose = require('composable-middleware');

function isAuthenticated() {
  return compose()
    //Validate jwt
    .use(function (req, res, next) {
      next();
    });
}

exports.isAuthenticated = isAuthenticated;
