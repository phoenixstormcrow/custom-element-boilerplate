/* input:  javascript source code with
           ${expression} placeholders
   output: javascript source code with placeholders replaced
           by the evaluated expressions

   exports: a function which takes a parsed package.json
            and returns a transform stream
*/

var babel = require('babel-core'),
    fs = require('fs'),
    Transform = require('stream').Transform;

module.exports = function (pkg) {
  var name = pkg.name,
      version = pkg.version,
      description = pkg.description,
      author = pkg.author,
      license = pkg.license,
      year = (new Date()).getFullYear(),
      code = '`',
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
