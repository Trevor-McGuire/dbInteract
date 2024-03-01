// import multiple resolvers and merge them
const product = require("./product");
const cloudinary = require("./cloudinary");
const ebayResolvers = require("./ebay");
const user = require("./user");

const resolvers = [
  cloudinary, 
  product,
  ebayResolvers,
  user,
];

module.exports = resolvers;