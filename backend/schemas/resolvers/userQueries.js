const { User } = require("../../models");
const { AuthenticationError } = require('../../utils/auth');
require("dotenv").config();

const userResolver = {
  Query: {

    readUser: async (parent, args, context, info) => {
      return User.findOne({ _id: context.user.data._id })
        .populate({
          path: "orders",
          populate: {
            path: "cart",
            populate: {
              path: "product",
              model: "Product",
              populate: {
                path: "images",
                model: "Image",
              },
            },
          },
        })
        .populate({
          path: "cart",
          populate: {
            path: "product",
            model: "Product",
            populate: {
              path: "images",
              model: "Image",
            },
          },
        });
    },

    readUserReview: async (parent, { productId }, context, info) => {
      const user = await User.findById(context.user.data._id).populate({
        path: "reviews",
        populate: {
          path: "product",
          model: "Product",
        },
      });
      
      const existingReview = user.reviews.find(
        (review) => review.product._id.toString() === productId
      );
      console.log("existingReview", existingReview)
      return existingReview;
    },

    hasProductInOrders: async (_, { productId }, context) => {
      const user = await User.findById(context.user.data._id).populate({
        path: "orders",
        populate: {
          path: "cart",
          populate: {
            path: "product",
            model: "Product",
          },
        },
      });
      const hasProduct = user.orders.some((order) => {
        return order.cart.some((cartItem) => {
          return cartItem.product._id.toString() === productId;
        });
      });
      console.log(hasProduct)
      return hasProduct;
    },

    hasExistingReview: async (_, { productId }, context) => {
      const user = await User.findById(context.user.data._id).populate({
        path: "reviews",
        populate: {
          path: "product",
          model: "Product",
        },
      });
      const hasReview = user.reviews.some((review) => {
        return review.product._id.toString() === productId;
      });
      console.log(hasReview)
      return hasReview;
    }
  },
};

module.exports = userResolver;
