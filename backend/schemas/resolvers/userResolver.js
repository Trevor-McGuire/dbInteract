const { User } = require("../../models");
const { signToken, AuthenticationError } = require('../../utils/auth');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const userResolver = {
  Query: {
    readUsers: async () => {
      return await User.find({});
    },
    readUser: async (parent, args, context, info) => {
      console.log(context);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user.data._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    registerUser: async (
      parent,
      {
        username,
        email,
        password,
        firstName,
        lastName,
        billingAddress,
        shippingAddress,
      },
      context,
      info
    ) => {
      const unique = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (unique) throw new Error("Username or email already taken");

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        isGuest: false,
        firstName,
        lastName,
        billingAddress,
        shippingAddress,
      });

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = userResolver;
