// import multiple resolvers and merge them
const product = require("./product");
const cloudinary = require("./cloudinary");
const ebayApi = require("./ebayApi");

const resolvers = [
  cloudinary, 
  product,
  ebayApi
];

module.exports = resolvers;