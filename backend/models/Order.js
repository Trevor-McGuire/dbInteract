const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: String,
  products: String,
  totalPrice: String,
  shippingAddress: String,
  orderDate: String,
  status: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;