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

productSchema.virtual('averageStars').get(function () {
  console.log('this.stars', this.stars.length);
  if (!this.stars || this.stars.length === 0) {
    return 0;
  }

  // Calculate the average stars
  const sumStars = this.stars.reduce((acc, star) => acc + star, 0);
  return sumStars / this.stars.length;
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
