'use strict';

var pm2 = require('pm2');

var MACHINE_NAME = process.env.WEB_MACHINE_NAME || 'hk1';
var PRIVATE_KEY = process.env.KEY_METRICS_PRIVATE_KEY || 'qigcd3tiue2el5k';   // Keymetrics Private key
var PUBLIC_KEY = process.env.KEY_METRICS_PUBLIC_KEY || 'ns4xyu6prfqcarv';   // Keymetrics Public  key
var instances = process.env.WEB_CONCURRENCY || -1; // Set by Heroku or -1 to scale to max cpu core -1
var maxMemory = process.env.WEB_MEMORY || 512;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var pm2_conf = {
  apps: [
    {
      name: "afrostream-api-v1",
      script: "./server/index.js",
      exec_mode: "cluster",
      autorestart: true
    }
  ],
  instances: instances,
  max_memory_restart: maxMemory + 'M',   // Auto restart if process taking more than XXmo
  post_update: ['npm install']           // Commands to execute once we do a pull from Keymetrics
};

pm2.connect(function () {
  pm2.start(pm2_conf, function (err) {
    if (err) {
      return console.error('Error while launching applications', err.stack || err);
    }
    console.log('PM2 and application has been succesfully started');
    if (process.env.NODE_ENV === 'production') {
      pm2.interact(PRIVATE_KEY, PUBLIC_KEY, MACHINE_NAME, function () {});
    }
  });
});
