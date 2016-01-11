'use strict';

/**
 * authentify a user using auth cookie.
 * set req.userAccessToken
 * if token is expired => 401 http error.
 *
 * @param options
 * @returns {Function}
 */
module.exports = function (options) {
  return function (req, res, next) {
    /*
      // FIXME: cookie auth
      if (req.signedCookie && req.signedCookie.auth) {
        var accessToken = req.signedCookie.auth.access_token;
        var expiresAt = req.signedCookie.auth.expires_at;
        if (new Date(expiresAt) < new Date()) {
          return res.status(401).json({message:'access_token expired'});
        }
        req.userAccessToken = accessToken;
      }
    */
    next();
  };
};