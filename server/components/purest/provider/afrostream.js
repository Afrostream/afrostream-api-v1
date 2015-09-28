var Purest = require('purest')
  , async = require('async')
  , _ = require('lodash')
  , config = rootRequire('/server/config/environment');

function Afrostream() {
  this.client = new Purest({
    provider: 'afrostream',
    token: '[ACCESS_TOKEN]',
    key: config.afrostream.apiKey,
    secret: config.afrostream.apiSecret,
    config: config.purest.providers
  });
}

Afrostream.prototype.getToken = function (done) {
  var self = this;

  if (!self.isTokenDataValid()) {
    self.client.query('oauth')
      .post('token')
      .form({
        grant_type: 'client_credentials',
        client_id: self.client.key,
        client_secret: self.client.secret
      })
      .request(function (err, data, body) {
        if (err) {
          done(err);
        } else {
          self.setTokenData(body);
          done(null, self.getTokenData());
        }
      });
  }
  else {
    done(null, self.getTokenData());
  }
};

Afrostream.prototype.getTokenData = function () {
  return this.tokenData;
};

/**
 * This function save tokenData inside this.tokenData
 * This function generate tokenData.expires_at (ISOString date)
 * @param tokenData Object
 */
Afrostream.prototype.setTokenData = function (tokenData) {
  if (String(tokenData.expires_in).match(/^\d+$/)) {
    // expires_in is a timespan in seconds
    tokenData.expires_at = new Date(Date.now() + 1000 * tokenData.expires_in).toISOString();
  } else {
    // expires_in is undefined or an iso string date
    tokenData.expires_at = tokenData.expires_in;
  }
  this.tokenData = tokenData;
};

/**
 * The token is valid if its expiration time is in the future
 * @returns {boolean}
 */
Afrostream.prototype.isTokenDataValid = function () {
  var tokenData = this.getTokenData();

  return tokenData && new Date(tokenData.expires_at).getTime() > Date.now();
};

Afrostream.prototype.logUser = function (username, password, done) {
  var self = this;
  self.client.query('oauth')
    .post('token')
    .form({
      grant_type: 'password',
      client_id: self.client.key,
      client_secret: self.client.secret,
      username: username,
      password: password
    })
    .request(function (err, data, body) {
      if (err) {
        done(err);
      } else {
        self.setTokenData(body);
        done(null, self.getTokenData());
      }
    });
};

Afrostream.prototype.substitute = function () {
  var theString = arguments[0];
  // start with the second argument (i = 1)
  for (var i = 1; i < arguments.length; i++) {
    // "gm" = RegEx options for Global search (more than one instance)
    // and for Multiline search
    var regEx = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
    theString = theString.replace(regEx, arguments[i]);
  }

  return theString;
};

Afrostream.prototype.getData = function (type, options, done) {
  var self = this;
  var selectRoute = type;
  if (options.id !== undefined) {
    selectRoute = this.substitute(type, options.id);
  }
  async.waterfall([
    function (done) {
      self.getToken(done);
    },
    function (result, done) {
      self.client
        .query('api')
        .select(selectRoute)
        .auth(result.access_token)
        .request(function (err, data, body) {
          if (err) return done(err);
          done(null, body);
        })
    }
  ], function (err, result) {
    if (err) return done(err);
    done(null, result, result);
  });
};

Afrostream.prototype.postData = function (type, options, done) {
  var self = this;
  var selectRoute = type;
  if (options.id !== undefined) {
    selectRoute = this.substitute(type, options.id);
  }
  async.waterfall([
    function (done) {
      self.getToken(done);
    },
    function (result, done) {
      self.client
        .query('api')
        .post(selectRoute)
        .form(options)
        .request(function (err, data, body) {
          if (err) return done(err);
          done(null, body);
        })
    }
  ], function (err, result) {
    if (err) return done(err);
    done(null, result, result);
  });
};

Afrostream.prototype.getSecureData = function (req, type, options, done) {
  var self = this;
  var selectRoute = type;
  if (options.id !== undefined) {
    selectRoute = this.substitute(type, options.id);
  }
  if (req.query.afro_token) {
    async.waterfall([
      function (done) {
        self.client
          .query('api')
          .select(selectRoute)
          .auth(req.query.afro_token)
          .request(function (err, data, body) {
            if (err) return done(err);
            done(null, body);
          })
      }
    ], function (err, result) {
      if (err) return done(err);
      done(null, result, result);
    });
  }
  else {
    return this.getData(type, options, done);
  }
};

Afrostream.prototype.postSecureData = function (type, options, done) {
  var self = this;
  var selectRoute = type;
  options.access_token = options.afro_token;
  async.waterfall([
      function (done) {
        self.client
          .query('api')
          .post(selectRoute)
          .json(options)
          .request(function (err, data, body) {
            console.log(err, body, data.headers);
            if (err) return done(err);
            done(null, body);
          });
      }
    ],
    function (err, result) {
      if (err) return done(err);
      done(null, result, result);
    })
  ;
};

Afrostream.prototype.menu = function (req, options, done) {
  var self = this;
  async.waterfall([
    function (done) {
      self.getSecureData(req, 'categorys/menu', {}, done);
    }
  ], function (err, result) {
    if (err) return done(err);
    var data = _.map(result, _.partialRight(_.pick, ['_id', 'label', 'slug']));
    done(null, data);
  });
};

exports = module.exports = Afrostream;