const Product = require("../../models/Product");
const cloudinary = require("../../config/cloudinary");

const product = {
  Query: {
    products: async () => {
      return await Product.find({}).populate("images", "url");
    },
  },
  Mutation: {
    createProduct: async (parent, { title, description, price }) => {
      return await Product.create({ title, description, price });
    },
    updateProduct: async (parent, { _id, title, description, price }) => {
      return await Product.findOneAndUpdate(
        { _id },
        {
          title,
          description,
          price,
        },
        {
          new: true,
        }
      );
    },
    deleteProduct: async (parent, { _id }) => {
      return await Product.findOneAndDelete({ _id });
    },
  },
};

module.exports = product;
