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
    cwd = process.cwd(),
    templateDir = path.normalize(__dirname + '/../templates'),
    tempDir = cwd + '/.tmp';

fs.copySync(templateDir + '/package.json',
  cwd + '/package.json');

var npmInit = spawn('npm', ['init'], {stdio: 'inherit'});
if (npmInit.status) {
  console.log("Error: npm init exited with status " + npmInit.status);
  process.exit(npmInit.status);
}


console.log('OK!');
