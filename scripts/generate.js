/* generate a custom element skeleton
   assumes we have a package.json file
*/

var fs = require('fs'),
    preprocess = require('./preprocess'),
    rs = fs.createReadStream('index.js', {encoding: 'utf8'}),
    ws = fs.createWriteStream('build/index.js', {encoding: 'utf8'}),
    pkg;

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

  //pipe index.js through preprocess
  rs.pipe(preprocess(pkg.name))
    .pipe(ws);
});
