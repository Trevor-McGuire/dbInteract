// import multiple resolvers and merge them
const dealApi = require("./dealApi");

const ebayResolvers = [
  dealApi
];

module.exports = ebayResolvers;