// import multiple resolvers and merge them
const dealApi = require("./dealApi");
const auth = require("./auth");

const ebayResolvers = [
  dealApi,
  auth
];

module.exports = ebayResolvers;