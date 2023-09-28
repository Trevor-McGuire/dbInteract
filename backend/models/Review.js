const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    validate: {
      validator: function(value) {
        return Number.isInteger(value) && value >= 0 && value <= 5;
      },
      message: 'Rating must be an integer between 0 and 5'
    }
  },
  title: {
    type: String,
    maxlength: 100, // Adjust the maximum length as needed
  },
  body: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
