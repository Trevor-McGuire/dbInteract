const { Product, Category } = require("../../models");


const productResolver = {
  Query: {
    readProducts: async (_, { _id, category, search }) => {
      let filter = {};
    
      if (_id) {
        filter._id = _id;
      }
    
      if (category) {
        const categoryObj = await Category.findOne({ name: category });
        filter.category = categoryObj._id;
      }
    
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }
    
      const products = await Product.find(filter)
        .populate("category")
        .populate("images")
        .populate({
          path: "ratings",
          populate: {
            path: "user",
            model: "User",
          },
        });
      return products;
    },
  },
};

module.exports = productResolver;
