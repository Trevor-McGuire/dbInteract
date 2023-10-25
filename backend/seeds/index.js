const fs = require('fs');
const path = require('path');
const db = require('../config/connection');
const { Product, User, Category, Review, Order } = require('../models');
const cleanDB = require('./cleanDB');
const bcrypt = require('bcryptjs');

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

db.once('open', async () => {
  try {
    // Console log that the connection to the database was successful
    console.log('Database connected!');

    // Delete all data from the database
    console.log('Deleting data...');
    await cleanDB();
    console.log('Data deleted!');

    // Read all .json files in the data folder
    const dataFiles = fs.readdirSync(path.join(__dirname, 'data')).filter(file => file.endsWith('.json'));

    // Loop through each data file
    for (const file of dataFiles) {
      // Extract the model name from the filename (remove the ".json" extension)
      const modelName = capitalizeFirstLetter(path.parse(file).name);

      // Bulk create documents for the current model
      console.log(`Creating ${modelName}s...`);
      const data = require(path.join(__dirname, 'data', file));
      
      // If it's the User model, hash the passwords
      if (modelName === 'User') {
        const salt = await bcrypt.genSalt(10);
        data.forEach(user => {
          user.password = bcrypt.hashSync(user.password, salt);
        });
      }

      await eval(modelName).insertMany(data);
      console.log(`${modelName}s created!`);
    }

    // Import categories
    console.log('Importing categories...');
    const importCategories = require('./importCategories');
    await importCategories();
    console.log('Categories imported!');

    // Import images
    console.log('Importing images...');
    const importImages = require('./importImages');
    await importImages();
    console.log('Images imported!');

    // Import users
    console.log('Importing users...');
    const importUsers = require('./importUsers');
    await importUsers();
    console.log('Users imported!');

    // Import reviews
    console.log('Importing reviews...');
    const importReviews = require('./importReviews');
    await importReviews();
    console.log('Reviews imported!');

    console.log('Seed process completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding process:', error);
    process.exit(1);
  }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

// Handle any unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise rejection:', reason);
  process.exit(1);
});
