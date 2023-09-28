const { Category, Image, Review, Product, Order, User } = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// require the .env file to get the secret
require('dotenv').config();

const resolvers = {
  Query: {
    readCategories: async () => {
      return await Category.find({});
    },
    readCategory: async (parent, { _id }) => {
      return await Category.findById(_id);
    },

    readImages: async () => {
      return await Image.find({});
    },
    readImage: async (parent, { _id }) => {
      return await Image.findById(_id);
    },

    readReviews: async () => {
      return await Review.find({})
        .populate("product")
        .populate("user");
    },
    readReview: async (parent, { _id }) => {
      return await Review.findById(_id);
    },

    readProducts: async () => {
      return await Product.find({})
        .populate("category")
        .populate("images")
        .populate({
          path: 'ratings',
          populate: {
            path: 'user',
            model: 'User',
          },
        });
    },
    readProduct: async (parent, { _id }) => {
      return await Product.findById(_id);
    },

    readUsers: async () => {
      return await User.find({});
    },
    readUser: async (parent, { _id }) => {
      return await User.findById(_id);
    },

    readOrders: async () => {
      return await Order.find({});
    },
    readOrder: async (parent, { _id }) => {
      return await Order.findById(_id);
    },

  },

  Mutation: {
    login: async (parent, args, context, info) => {
      const user = await User.findOne({email: args.email});
      if (!user) throw new Error("No such user found");
    
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) throw new Error("Invalid password");
    
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    
      // 3
      return {
        token,
        user,
      };
    }
  }
};

module.exports = resolvers;
