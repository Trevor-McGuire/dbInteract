const Product = require("../../models/Product");
const cloudinary = require("../../config/cloudinary");
const { authUtils } = require("../../utils/authUtils");
const Location = require("../../models/LocationModel");

const product = {
  Query: {
    readProducts: authUtils(async (parent, args, context) => {
      const { session } = context.req;
      const userId = session.user;
    
      const products = await Product.find({ userId })
        .populate("images", "url")
        .populate("location.locationId", "name");
    
      // Extract the populated location data
      const populatedProducts = products.map(product => ({
        ...product.toObject(),
        location: product.location.map(loc => ({
          name: loc.locationId.name,
          quantity: loc.quantity,
        })),
      }));
    
      return populatedProducts;
    }),
  },
  Mutation: {
    createProduct: authUtils(async (parent, { title, description, price, location }, context) => {
      console.log("location", location);
      const { session } = context.req;
      const userId = session.user;

      return await Product.create({ title, description, price , userId, location });
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

    createProductLocation: authUtils(async (parent, { _id, location, quantity }, context) => {
      const { session } = context.req;
      const userId = session.user;

      const product = await Product.findOne({ _id, userId });

      existingLocation = Location.findOne({ name: location });
      if (!existingLocation) {
        throw new Error("Location does not exist");
      }

      product = await Product.findOneAndUpdate(
        { _id, userId },
        {
          $push: {
            location: {
              location: existingLocation._id,
              quantity,
            },
          },
        },
        {
          new: true,
        }
      );

      return product;
    }),
  },
};

module.exports = product;
