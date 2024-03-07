// import multiple resolvers and merge them
const product = require("./product");
const cloudinary = require("./cloudinary");
const ebayResolvers = require("./ebay");
const user = require("./user");
const location = require("./location");

const resolvers = [
  cloudinary, 
  product,
  ebayResolvers,
  user,
  location
];

module.exports = resolvers;