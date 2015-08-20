var Purest = require('purest')
  , async = require('async')
  , _ = require('lodash');

function Afrostream() {
  this.client = new Purest({
    provider: 'afrostream',
    token: '[ACCESS_TOKEN]',
    key: process.env.AFROSTREAM_API_KEY,
    secret: process.env.AFROSTREAM_API_SECRET,
    config: require('../config/afrostream.provider.json')
  });
}

Afrostream.prototype.getToken = function (done) {
  var self = this;
  self.client.query('oauth')
    .post('token')
    .form({
      grant_type: 'client_credentials',
      client_id: 'ab183363-2f9b-4cdb-b124-346fa3bfc7cb',
      client_secret: '455e6886-67e6-49fe-aca5-1248441bb493'
    })
    .request(function (err, data, body) {
      self.tokenData = body;
      done(null, body);
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
        .query()
        .select(selectRoute)
        .auth(result.access_token)
        .request(function (err, data, body) {
          if (err) return done(err);
          done(null, body);
        })
    }
  ], function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
};


Afrostream.prototype.menu = function (options, done) {
  var self = this;
  async.waterfall([
    function (done) {
      self.getData('categorys/menu', {}, done);
    }
  ], function (err, result) {
    if (err) return done(err);
    var data = _.map(result, _.partialRight(_.pick, ['_id', 'label', 'slug']));
    done(null, data);
  });
};

exports = module.exports = Afrostream;