// import multiple resolvers and merge them
const product = require("./product");
const cloudinary = require("./cloudinary");
const ebayResolvers = require("./ebay");

const resolvers = [
  cloudinary, 
  product,
  ebayResolvers
];

module.exports = resolvers;