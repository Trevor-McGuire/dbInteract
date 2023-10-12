const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  isGuest: {
    type: Boolean,
    default: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  billingAddress: {
    type: String,
  },
  shippingAddress: {
    type: String,
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
