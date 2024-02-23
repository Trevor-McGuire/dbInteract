const product = require('./product');
const cloudinary = require('./cloudinary');
const image = require('./image');
const ebayTypeDefs = require('./ebay');

const typeDefs = [
  product, 
  cloudinary,
  image,
  ebayTypeDefs
];

module.exports = typeDefs;