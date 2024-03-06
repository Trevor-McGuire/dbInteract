const UserService = require("../../services/userService");
const { authUtils } = require("../../utils/authUtils");
const User = require("../../models/userModel");
const AppSessionService = require("../../services/appSessionService");

const user = {
  Query: {
    user: authUtils(async (parent, { id }) => {
      return await UserService.returnUserById(id);
    }),
    users: async () => {
      return await User.find();
    },

    readSession: async (parent, args, context) => {
      const { session } = context.req;
      const response = session ? true : false;
      return response;
    },
  },
  Mutation: {
    createUser: async (parent, { username, password }, context) => {
      await UserService.checkExistingUser(username);
      const hashed = await UserService.returnHashed(password);
      const user = new User({ username, password: hashed });
      await user.save();
      const sessionId = await AppSessionService.createSession(user);
      context.res.cookie("sessionId", sessionId, {
        httpOnly: true,
        sameSite: 'lax', // or 'lax'
        secure: false ,
      });
      return { sessionId, message: "User created" };
    },

    createSession: async (parent, { username, password }, context) => {
      await UserService.checkNewUser(username);
      await UserService.checkPasswordMatches(username, password);
      const user = await User.findOne({ username });
      const sessionId = await AppSessionService.createSession(user);
      context.res.cookie("sessionId", sessionId, {
        httpOnly: true,
        sameSite: 'lax', // or 'lax'
        secure: false ,
      });
      return { sessionId, message: "User logged in" };
    },


    deleteSession: async (parent, args, context) => {
      const { session } = context.req;
      const sessionId = session._id;
      await AppSessionService.deleteSession(sessionId);
      context.res.clearCookie("sessionId");
      return "Session deleted";
    },

    deleteUser: authUtils(async (parent, args, context) => {
      const { session } = context.req;
      const userId = session.user;
      await User.findByIdAndDelete(userId);
      return "User deleted";
    }),
  },
};

module.exports = user;
