const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { wrapServiceMethods } = require("../utils/errorHandler");

const UserService = {
  checkForUser: async (username, shouldExist) => {
    // validate username
    // set shouldExist to true if createSession
    // set shouldExist to false if createUser
    // valid username should pass though this function
    const user = await User.findOne({ username });
    if (shouldExist && !user) {
      throw new Error("Username or password incorrect");
    } else if (!shouldExist && user) {
      throw new Error("Username unavailable");
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
