// import multiple resolvers and merge them
const product = require("./product");
const cloudinary = require("./cloudinary");

const resolvers = [cloudinary, product];

module.exports = resolvers;