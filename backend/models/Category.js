const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  depth: Number,
  identifier: {
    type: String,
    required: false
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;