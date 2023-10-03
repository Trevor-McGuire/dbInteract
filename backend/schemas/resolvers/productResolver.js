const { Product } = require("../../models");

const productResolver = {
  Query: {
    readProducts: async () => {
      return await Product.find({})
        .populate("category")
        .populate("images")
        .populate({
          path: "ratings",
          populate: {
            path: "user",
            model: "User",
          },
        });
    },
    readProduct: async (parent, { _id }) => {
      return await Product.findById(_id)
        .populate("category")
        .populate("images")
        .populate({
          path: "ratings",
          populate: {
            path: "user",
            model: "User",
          },
        });
    },
    readProductsByCategory: async (parent, { category }) => {
      return await Product.find({ category: category })
        .populate("category")
        .populate("images")
        .populate({
          path: "ratings",
          populate: {
            path: "user",
            model: "User",
          },
        });
    },
    searchProducts: async (_, { query }) => {
      const regex = new RegExp(query, "i");
      const filteredProducts = await Product.find({
        title: { $regex: regex },
      })
        .populate("category")
        .populate("images")
        .populate({
          path: "ratings",
          populate: {
            path: "user",
            model: "User",
          },
        });
      return filteredProducts;
    },
  },
};

module.exports = productResolver;
