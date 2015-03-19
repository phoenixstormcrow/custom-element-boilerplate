/* generate a custom element skeleton
   assumes we have a package.json file
*/

var fs = require('fs'),
<<<<<<< HEAD
    fork = require('child_process').fork,
    pkg,
    preprocess;
=======
    preprocess = require('./preprocess'),
    rs = fs.createReadStream('index.js', {encoding: 'utf8'}),
    ws = fs.createWriteStream('build/index.js', {encoding: 'utf8'}),
    pkg;
>>>>>>> stream

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

<<<<<<< HEAD
  preprocess = fork('scripts/preprocess.js', [pkg.name]);

  //pipe index.js through preprocess

=======
  //pipe index.js through preprocess
  rs.pipe(preprocess(pkg.name))
    .pipe(ws);
>>>>>>> stream
});
