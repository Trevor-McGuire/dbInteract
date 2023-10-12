const { connect, connection } = require("mongoose");
require("dotenv").config();

console.log("Starting DB connection...");

if (!process.env.MONGODB_URI) {
  console.log("No MONGODB_URI provided");
  process.exit(1);
}

const connectionString = process.env.MONGODB_URI;
connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = connection;