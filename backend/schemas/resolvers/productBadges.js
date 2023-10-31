const { User, Product, CartItem, Order, Review } = require("../../models");

const productBadges = {
  Mutation: {
    inStock: async (_, { productId }) => {
      const product = await Product.findById(productId);
      if (!product) throw new Error("Product not found");

      product.stock > 0 ? (product.stock = true) : (product.stock = false);
      await product.save();
      return product;
    },
  },
};

module.exports = productBadges;
