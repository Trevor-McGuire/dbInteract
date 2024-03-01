const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const AuthService = require("./authService");
const { wrapServiceMethods } = require("../utils/errorHandler");

const UserService = {
  getUser: async (id) => {
    return await UserService.returnUserById(id);
  },

  getUsers: async () => {
    return await User.find();
  },

  createUser: async (username, password) => {
    await UserService.checkExistingUser(username);
    const hashedPassword = await UserService.returnHashedUserPassword(password);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    return await AuthService.generateToken(user);
  },

  checkExistingUser: async (username) => {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("Username already exists");
    }
  },

  returnUserById: async (id) => {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  returnHashedUserPassword: async (password) => {
    return await bcrypt.hash(password, 10);
  },
};

const context = { stack: [] };
wrapServiceMethods(UserService, context, "UserService");

module.exports = UserService;
