const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: [String],
  price: {
    type: Number,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
