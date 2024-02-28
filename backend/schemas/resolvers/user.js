const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const user = {
  Query: {
    user: async (parent, { id }) => {
      const user = await User.findById(id);
      return user;
    },
    users: async () => {
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    createUser: async (parent, { username, password }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) throw new Error("Username already exists");
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      return user;
    },
    updateUserPassword: async (parent, { id, oldPassword, newPassword }) => {
      const user = await User.findById(id);
      const correctPw = await bcrypt.compare(oldPassword, user.password);
      if (!correctPw) throw new Error("Invalid credentials");
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return user;
    },
    updateUserEbaySession: async (parent, { id, ebaySession }) => {
      const user = await User.findByIdAndUpdate(id, { ebaySession }, { new: true });
      return user;
    },
    deleteUser: async (parent, { id }) => {
      const user = await User.findByIdAndDelete(id);
      return user;
    },
  },
};

module.exports = user;
