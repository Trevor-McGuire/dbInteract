const UserService = require("../../services/userService");
const { authUtils } = require('../../utils/authUtils');

const user = {
  Query: {
    user: authUtils(async (parent, { id }) => UserService.getUser(id)),
    users: async () => UserService.getUsers(),
  },
  Mutation: {
    createUser: async (parent, { username, password }) =>
      UserService.createUser(username, password),
  },
};

module.exports = user;
