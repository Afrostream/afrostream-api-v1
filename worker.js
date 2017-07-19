// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// global
global.__basedir = __dirname;
global.rootRequire = name => require(global.__basedir + '/' + (name[0] === '/' ? name.substr(1) : name));

// dev & staging: live reload.
const config = require('./config');

if (config.livereload) {
  require('./livereload');
}

// launching the app
require('./app/index.js');
