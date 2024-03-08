const mongoose = require('mongoose');

const productLocationSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
  quantity: Number,
});

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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  location: [productLocationSchema],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
