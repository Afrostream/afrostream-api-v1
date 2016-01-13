'use strict';

var bootstrap = require('../bootstrap.js');

var config = require('../../config');

var app = bootstrap.getApp();

var request = require('supertest');

var assert = require('better-assert');

describe('POST /auth/signin', function() {
  before(function (done) {
    require('request')({
      method: 'GET',
      uri: 'http://'+config.backend.authority+'/alive',
      json: true
    }, function (err, response, body) {
      if (err || !body || !body.alive) {
        done('to run the test, dev backend must be UP & ready.');
      } else {
        done();
      }
    });
  });

  it('should respond 200 OK with a valid access_token', function(done) {
    request(app)
      .post('/auth/signin')
      .send({
        email: 'admin@admin.com',
        password: 'admin'
      })
      .expect('Content-Type', /json/)
      .expect(200, function (err, res) {
        assert(res.body.accessToken);

        request(app)
          .get('/api/users/me?afro_token='+res.body.accessToken)
          .expect(200, function (err, res) {
            assert(res.body.email === 'admin@admin.com');
            done();
          })
      });
  });
});