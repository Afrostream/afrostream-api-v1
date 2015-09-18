'use strict';

// permet de require un fichier depuis la racine du projet
// usage ex: rootRequire('/server/config/environment/');
global.rootRequire = function (name) { return require(__dirname + '/../' + name); };
global.__base = __dirname + '/../';

// Export the application
exports = module.exports = require('./app');
