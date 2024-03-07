const Product = require("../../models/Product");
const cloudinary = require("../../config/cloudinary");
const { authUtils } = require("../../utils/authUtils");

const product = {
  Query: {
    readProducts: authUtils(async (parent, args, context) => {
      const { session } = context.req;
      const userId = session.user;
      return await Product.find({ userId }).populate("images", "url");
    }),
  },
  Mutation: {
    createProduct: authUtils(async (parent, { title, description, price }, context) => {
      const { session } = context.req;
      const userId = session.user;

      return await Product.create({ title, description, price , userId});
    }),
    updateProduct: authUtils(async (parent, { _id, title, description, price }, context) => {
      const { session } = context.req;
      const userId = session.user;

      return await Product.findOneAndUpdate(
        { _id },
        {
          title,
          description,
          price,
          userId,
        },
        {
          new: true,
        }
      );
    }),
    deleteProduct: authUtils(async (parent, { _id }, context) => {
      const { session } = context.req;
      const userId = session.user;

      await Product.findOneAndDelete({ _id, userId });
      return "Product deleted";
    }),
  },
};

module.exports = product;
