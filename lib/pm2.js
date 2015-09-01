var pm2 = require('pm2');
var cpm2_conf = require('./../pm2_config.json');
var _ = require('lodash');
const env = process.env.NODE_ENV || 'development';
if (~'development,staging'.indexOf(env)) {
  console.log('todo run dev')
}
else {
  const MACHINE_NAME = process.env.WEB_MACHINE_NAME || 'hk1';
  const PRIVATE_KEY = process.env.KEY_METRICS_PRIVATE_KEY || 'qigcd3tiue2el5k';   // Keymetrics Private key
  const PUBLIC_KEY = process.env.KEY_METRICS_PUBLIC_KEY || 'ns4xyu6prfqcarv';   // Keymetrics Public  key

  const instances = process.env.WEB_CONCURRENCY || -1; // Set by Heroku or -1 to scale to max cpu core -1
  const maxMemory = process.env.WEB_MEMORY || 512;

  const app_conf = _.merge(cpm2_conf, {
    instances: instances,
    max_memory_restart: maxMemory + 'M',   // Auto restart if process taking more than XXmo
    post_update: ['npm install']       // Commands to execute once we do a pull from Keymetrics
  });


  pm2.connect(function () {
    pm2.start(app_conf, function (err) {
      if (err) return console.error('Error while launching applications', err.stack || err);
      console.log('PM2 and application has been succesfully started');
      pm2.interact(PRIVATE_KEY, PUBLIC_KEY, MACHINE_NAME, function () {
      });
    });
  });
}
