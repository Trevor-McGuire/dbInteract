const fs = require('fs');
const path = require('path');

function importModules(directory) {
  try {
    const fullPath = path.join(__dirname, directory);

    if (!fs.existsSync(fullPath)) {
      console.error(`Directory not found: ${directory}`);
      return [];
    }

    return fs.readdirSync(fullPath)
      .map(file => require(path.join(fullPath, file)));
  } catch (error) {
    console.error('Error importing modules:', error);
    return [];
  }
}

const typeDefs = importModules('./typeDefs');
const resolvers = importModules('./resolvers');

module.exports = { typeDefs, resolvers };