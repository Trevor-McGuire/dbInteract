const Product = require("../models/Product");

const updateBadges = async () => {
  const products = await Product.find();

  for (const product of products) {
    product.badges.inStock = product.stock > 0;

    
    await product.save();
  }
};

module.exports = updateBadges;
