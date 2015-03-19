/* we want to read a file and evaluate expressions
   like ${foo}, and write the result
*/

var babel = require('babel-core'),
    fs = require('fs'),
    Transform = require('stream').Transform;

//process.stdin.setEncoding('utf8');

//process.stdin.on('data', function(chunk) {
//  code += chunk;
//});

//process.stdin.on('end', function () {
//  code += '`';
//  var result = eval(babel.transform(code).code);
//  process.stdout.write(result);
//});

module.exports = function (tagName) {
  var code = '`',
  stream = new Transform({encoding: 'utf8'});
  stream._transform = function (chunk, enc, cb) {
    code += chunk;
    cb();
  };
  stream._flush = function (cb) {
    code += '`';
    this.push(eval(babel.transform(code).code));
    cb();
  };

  return stream;
};
