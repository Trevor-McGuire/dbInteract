const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { wrapServiceMethods } = require("../utils/errorHandler");

const UserService = {
  checkExistingUser: async (username) => {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("Username already exists");
    }
  },

  checkNewUser: async (username) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Username or password incorrect");
    }
  },

  checkPasswordMatches: async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Username or password incorrect");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Username or password incorrect");
    }
  },

  returnUserById: async (id) => {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  returnHashed: async (toHash) => {
    const saltRounds = 10;
    try {
      const hashed = await bcrypt.hash(toHash, saltRounds);
      return hashed;
    } catch (error) {
      throw new Error("Error hashing");
    }
    
  },

  returnLoggedInUser: async (user) => {
    return await UserService.createSession(user);
  },

};

const context = { stack: [] };
wrapServiceMethods(UserService, context, "UserService");

module.exports = UserService;
