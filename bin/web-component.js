#! /usr/bin/env node

/* perform the following steps

* set working directory X
* create directory structure
* write out package.json to wd
* run npm init
* preprocess our templates
* write processed files to wd
* npm install dev deps
* clean up
 */

var os = require('os'),
    fs = require('fs-extra'),
    path = require('path'),
    spawn = require('child_process').spawnSync,
    interpolate = require('es6-interpolate-stream'),
    cwd = process.cwd(),
    templateDir = path.normalize(__dirname + '/../templates'),
    tempDir = cwd + '/.tmp';

fs.mkdirSync(tempDir);

fs.copySync(templateDir + '/package.json',
  cwd + '/package.json');

fs.copySync(templateDir + '/index.js',
  cwd + '/index.js');

function checkExit (cmd, status) {
  if (status) {
    console.log("Error: " + cmd
      + "exited with status " + status);
    process.exit(status);
  }
}

function getPkg() {
  return JSON.parse(fs.readFileSync('package.json', 'utf8'));
}

checkExit('npm init', spawn('npm', ['init'], {stdio: 'inherit'}).status);

var context = getPkg();
context.year = (new Date()).getFullYear();
var s = fs.createReadStream('index.js', {encoding: 'utf8'})
  .pipe(interpolate(context))
  .pipe(fs.createWriteStream(tempDir + '/index.js', {encoding: 'utf8'}))
  .on('finish', function () {
    fs.copySync(tempDir + '/index.js', cwd + '/index.js');
    fs.removeSync(tempDir);
  });

checkExit('npm install', spawn('npm', ['install'], {stdio: 'inherit'}).status);

console.log('OK!');
