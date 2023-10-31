const { User, Product, CartItem, Order, Review } = require("../../models");
const { signToken, AuthenticationError } = require("../../utils/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");

const userResolver = {
  Mutation: {
    registerUser: async (parent, args, context, info) => {
      args.input.password = await bcrypt.hash(args.input.password, 10);

      const unique = await User.findOne({
        $or: [{ username: args.input.username }, { email: args.input.email }],
      });
      if (unique) throw new Error("Username or email already taken");

      const user = await User.create(args.input);

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const correctPw = await bcrypt.compare(password, user.password);
      if (!correctPw) throw new Error("Invalid credentials");

      const token = signToken(user);
      return { token, user };
    },
    addToCart: async (parent, { productId, quantity }, context) => {
      const userId = context.user.data._id;

      const user = await User.findOne({ _id: userId }).populate({
        path: "cart",
        populate: {
          path: "product",
          model: "Product",
        },
      });
      if (!user) throw new Error("Invalid credentials");

      const product = await Product.findOne({ _id: productId });
      if (!product) throw new Error("Product not found");

      if (quantity > product.stock) {
        throw new Error("Not enough stock");
      }

      product.quantity -= quantity;

      const existingCartItem = user.cart.find(
        (cartItem) => cartItem.product._id.toString() === productId
      );

      if (existingCartItem) {
        const updatedCartItem = await CartItem.findOneAndUpdate(
          { _id: existingCartItem._id },
          { $inc: { quantity } },
          { new: true }
        );
        const updatedUser = await User.findOne({ _id: userId });
        return updatedUser;
      } else {
        const cartItem = await CartItem.create({
          product: product._id,
          quantity,
          user: userId,
        });
        updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { cart: cartItem } },
          { new: true }
        );
        return updatedUser;
      }
    },
    removeFromCart: async (parent, { cartItemId }, context) => {
      const userId = context.user.data._id;

      const user = await User.findOne({ _id: userId });
      if (!user) throw new Error("Invalid credentials");

      const cartItem = await CartItem.findOne({ _id: cartItemId });
      if (!cartItem) throw new Error("Cart item not found");

      const removedCartItem = await CartItem.findOneAndDelete({
        _id: cartItemId,
      });

      const removedCartItemRef = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { cart: cartItemId } },
        { new: true }
      );

      return removedCartItem;
    },
    checkout: async (parent, args, context) => {
      const userId = context.user.data._id;

      const user = await User.findOne({ _id: userId });
      if (!user) throw new Error("Invalid credentials");

      const order = await Order.create({ user: userId, cart: user.cart });

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { cart: [] }, $addToSet: { orders: order._id } },
        { new: true }
      );

      return user;
    },
  },
};

module.exports = userResolver;
