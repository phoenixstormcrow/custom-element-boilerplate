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

module.exports = function (context) {
  var year = (new Date()).getFullYear(),
      code = '`',
      stream = new Transform({encoding: 'utf8'});

  context.year = year;

  stream._transform = function (chunk, enc, cb) {
    code += chunk;
    cb();
  };

  stream._flush = function (cb) {
    code += '`';
    var out,
        tokens = babel.transform(code).ast.tokens;

    tokens.filter(function (token) {
      return token.type.type === 'name';
    })
    .forEach(function (token) {
      token.value = eval('context.' + token.value);
    })

    out = tokens.map(function (token) {
      return token.value;
    }).join('');

    this.push(out);
    cb();
  };

  return stream;
};
