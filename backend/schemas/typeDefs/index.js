const product = require('./product');
const cloudinary = require('./cloudinary');
const image = require('./image');
const ebayTypeDefs = require('./ebay');
const user = require('./user');

const typeDefs = [
  product, 
  cloudinary,
  image,
  ebayTypeDefs,
  user
];

module.exports = typeDefs;