const mongoose = require('mongoose');

const cleanDatabase = async () => {
  try {
    const connection = mongoose.connection;
    const collections = await connection.db.listCollections().toArray();

    for (const collection of collections) {
      await connection.db.dropCollection(collection.name);
      console.log(`Collection ${collection.name} has been cleaned.`);
    }

    console.log('All collections have been cleaned.');
  } catch (err) {
    console.error('Error cleaning the database:', err);
  }
};

module.exports = cleanDatabase;
