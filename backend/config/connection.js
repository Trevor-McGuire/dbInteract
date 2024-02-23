const { connect, connection } = require("mongoose");
require("dotenv").config();

console.log("Starting DB connection...");

MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log("No MONGODB_URI provided");
  process.exit(1);
}

const connectionString = MONGODB_URI;
connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

connection.on('connected', () => {
  console.log('Successfully connected to MongoDB');
});

connection.on('error', (error) => {
  console.log('Error connecting to MongoDB:', error);
});

module.exports = connection;