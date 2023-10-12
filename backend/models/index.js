const fs = require('fs');
const path = require('path');

const models = {};

// Read the current directory and filter out the index file itself
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models[model.modelName] = model;
  });

module.exports = models;