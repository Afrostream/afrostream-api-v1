/*
 * in dev, we want to do hot reload inside docker.
 */
const chokidar = require('chokidar');
const fs = require('fs');

const jsFiles = fs.readdirSync('./')
  .filter(file => file.match(/\.js$/));

const watchFilesAndDirs = [ './app', './config', ...jsFiles ];

const watcher = chokidar.watch('./app');

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("[INFO]: Clearing require cache from server")

    Object.keys(require.cache).forEach(function(id) {
      console.log(`[INFO]: delete require.cache[${id}]`);
      delete require.cache[id];
    });
  });
});
