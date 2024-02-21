const product = require('./product');
const cloudinary = require('./cloudinary');
const image = require('./image');

const typeDefs = [
  product, 
  cloudinary,
  image
];

module.exports = typeDefs;