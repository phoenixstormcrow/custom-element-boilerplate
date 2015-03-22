/* mkdirs.js

   set up the directory structure for web-component
*/

var fs = require('fs-extra'),
    path = require('path'),
    async = require('async'),
    dirs = [
      '.tmp', // temp dir
      'lib', // where production code goes
      'src', // where dev code goes. transpiled, etc. in build step
      'demo', // every component needs a demo!
      'test', // every component needs testing
      'build', // the results of build steps go here
      'doc', // document it here
    ],
    calls;

module.exports = function (cwd) {
  calls = dirs.map(function (dir) {
    return path.join(cwd, dir);
  }).map(function (dir) {
    return function (cb) {
      console.log('Creating ' + dir);
      fs.ensureDir(dir, cb); // create if not exists
    }
  });
  async.parallel(calls, function (err) {
    if (err) {
      console.error(err);
      process.exit(err.errno);
    }
  });
};
