/* generate a custom element skeleton
   assumes we have a package.json file
*/

var fs = require('fs'),
    fork = require('child_process').fork,
    pkg,
    preprocess;

fs.readFile('package.json', 'utf8', function (err, result) {
  if (err) {
    console.log(err);
    return;
  }
  try {
    pkg = JSON.parse(result);
  } catch (e) {
    console.log(e);
    return;
  }

  preprocess = fork('scripts/preprocess.js', [pkg.name]);

  //pipe index.js through preprocess

});
