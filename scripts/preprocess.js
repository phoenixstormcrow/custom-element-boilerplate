/* we want to read a file and evaluate expressions
   like ${foo}, and write the result
*/

var babel = require('babel-core'),
    fs = require('fs'),
    tagName = process.argv[2],
    code = '`';

process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  code += chunk;
});

process.stdin.on('end', function () {
  code += '`';
  var result = eval(babel.transform(code).code);
  process.stdout.write(result);
});
