const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const Product = require('../models/Product');

const importImages = async () => {
  try {
    const products = await Product.find();

    for (const product of products) {
      const productFolderPath = path.join('C:\\Users\\Trevor\\WebDevelopment\\NexCommerce\\frontend\\public\\images\\products', String(product._id));
      if(!productFolderPath) return;
      try {
        const files = await fs.readdir(productFolderPath);
        product.images = files.map(file => ({ url: path.join('images', 'products', String(product._id), file).replace(/\\/g, '/') }));
        await product.save();
      } catch (error) {
        console.error(error);
      }
    }
  } catch (err) {
    console.error('Error importing images:', err);
  }
};


module.exports = importImages;
