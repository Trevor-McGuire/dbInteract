const Sequelize = require('sequelize');
const { connect, connection } = require('mongoose');
require('dotenv').config();

let sequelize;

console.log("Starting DB connection...")
if (process.env.JAWSDB_URL) {
  console.log("DB connection using JAWSDB_URL")
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  module.exports = sequelize;
} else {
  const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taking-stockDB';
  connect(connectionString)
  module.exports = connection;
}
