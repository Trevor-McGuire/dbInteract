const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100, // Adjust the maximum length as needed
  },
  description: String,
  price: {
    type: Number,
    // Validate that the price is a positive number with two decimal places
    validate: {
      validator: function (value) {
        // This regular expression checks if the value is a valid positive number with exactly two decimal places
        return /^\d+\.\d{2}$/.test(value.toString());
      },
      message: 'Price must be a positive number with two decimal places',
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  quantity: String,
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  }],
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
