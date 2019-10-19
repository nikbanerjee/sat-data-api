const path = require("path")
const _ = require('lodash');
const fs = require('fs');
const excluded = ['index.js']; // named route files to be excluded e.g. 'index.js'

module.exports = (app) => {
  let directory = path.join(__dirname + '/../routes');

  fs.readdirSync(directory).forEach((file) => {
    // remove extension from file name
    let basename = file.split('.')[0];

    // only load files that aren't directories and aren't blacklisted
    if (
      !fs.lstatSync(directory + '/' + file).isDirectory() &&
      !_.includes(excluded, file)
    ) {
      app.use('/' + basename, require('../routes/' + file));
    } else if (basename === 'index') { // include the index.js file
      app.use('/', require('../routes/' + file));
    }
  });
};
