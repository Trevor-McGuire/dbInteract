const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: String,
  price: {
    type: Number,
  },
  category: {
    type: String,
    ref: 'Category',
  },
  quantity: String,
  images: [
    {
      url: String,
    },
  ],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  stars: [Number],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
