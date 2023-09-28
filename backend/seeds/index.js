const db = require("../config/connection");
const { Product, User, Category, Image, Review, Order,  } = require("../models");
const cleanDB = require("./cleanDB");
const bcrypt = require('bcryptjs');

const productData = require("./productData.json");
const categoryData = require("./categoryData.json");
const imageData = require("./imageData.json");
const userData = require("./userData.json");
const reviewData = require("./reviewData.json");

db.once("open", async () => {
  try {
    // Console log that the connection to the database was successful
    console.log("Database connected!");

    // Delete all data from the database
    console.log("Deleting data...");
    await cleanDB();
    console.log("Data deleted!");

    // Bulk create categories
    console.log("Creating categories...");
    await Category.insertMany(categoryData);
    console.log("Categories created!");

    // Bulk create images
    console.log("Creating images...");
    await Image.insertMany(imageData);
    console.log("Images created!");

    // Bulk create users
    console.log("Creating users...");
    // running bcrypt on the password before seeding the database
    const salt = await bcrypt.genSalt(10);
    const saltedUserData = userData.map(user => {
      user.password = bcrypt.hashSync(user.password, salt);
      return user;
    });
    await User.insertMany(saltedUserData);
    console.log("Users created!");

    // Bulk create products
    console.log("Creating products...");
    await Product.insertMany(productData);
    console.log("Products created!");

    // Bulk create reviews
    console.log("Creating reviews...");
    await Review.insertMany(reviewData);
    console.log("Reviews created!");

    console.log("Seed process completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding process:", error);
    process.exit(1);
  }
});

// Handle any uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

// Handle any unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise rejection:", reason);
  process.exit(1);
});
