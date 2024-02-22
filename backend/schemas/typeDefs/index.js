const product = require('./product');
const cloudinary = require('./cloudinary');
const image = require('./image');
const ebayApi = require('./ebayApi');

const typeDefs = [
  product, 
  cloudinary,
  image,
  ebayApi
];

module.exports = typeDefs;