const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Add this field for reviews made by the user
});

const User = mongoose.model("User", userSchema);

module.exports = User;
