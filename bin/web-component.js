#! /usr/bin/env node

/* perform the following steps

* set working directory X
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
    preprocess = require('../lib/preprocess'),
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
  var pkg = fs.readFileSync('package.json', 'utf8');
  return JSON.parse(pkg);
}

checkExit('npm init', spawn('npm', ['init'], {stdio: 'inherit'}).status);
checkExit('npm install', spawn('npm', ['install'], {stdio: 'inherit'}).status);

var s = fs.createReadStream('index.js', {encoding: 'utf8'})
  .pipe(preprocess(getPkg()))
  .pipe(fs.createWriteStream(tempDir + '/index.js', {encoding: 'utf8'}))
  .on('finish', function () {
    fs.copySync(tempDir + '/index.js', cwd + '/index.js');
    fs.removeSync(tempDir);
  });

console.log('OK!');
