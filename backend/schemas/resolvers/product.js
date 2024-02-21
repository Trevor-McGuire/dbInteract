const Product = require("../../models/Product");
const cloudinary = require("../../config/cloudinary");

const product = {
  Query: {
    products: async () => {
      return await Product.find({});
    },

    images: async () => {
      console.log(cloudinary.config())
      const publicId = "https://asset.cloudinary.com/dpcmouapx/c0ea9ad76824bb2fae84a0168f05b359";
      const options = {
        colors: true,
      };

      try {
        const test = await cloudinary.api.usage(function(error, result) {
          console.log(result);
        });
        // const result = await cloudinary.api.resource(publicId, options);
        // console.log(result);
        // return result.colors;
      } catch (error) {
        console.error(error);
      }
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
