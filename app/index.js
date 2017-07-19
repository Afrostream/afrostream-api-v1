const config = require('../config');

const app = require('./app.js');

if (process.env.NODE_ENV === 'development') {
  var pem = require('pem');
  pem.createCertificate({days: 1, selfSigned: true}, function (err, data) {
    require('https').createServer({key: data.serviceKey, cert: data.certificate}, app).listen(3443, config.ip, function () {
      console.log('Express HTTPS server listening on %d, in %s mode', 3443, app.get('env'));
    })
  });
}

// Start server
app.listen(config.port, config.ip, function () {
  console.log('Express HTTP server listening on %d, in %s mode', config.port, app.get('env'));
});

module.exports = app;
