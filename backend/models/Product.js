const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: [String],
  price: {
    type: Number,
  },
  // array of images that reference the Image model
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
