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
      return products;
    },

    getProductInfo: async (_, { productId }) => {
      const product = await Product.findById(productId)
        .populate("reviews")
      return product;
    },
    readReviews: async (_, { productId, rating, page, pageSize }) => {
      const product = await Product.findById(productId)
        .populate({
          path: "reviews",
          populate: {
            path: "user",
            model: "User",
          },
        });
      let reviews = product.reviews;
      if (rating) {
        reviews = reviews.filter((review) => review.rating === rating);
      }
      if (page && pageSize) {
        reviews = reviews.slice(
          (page - 1) * pageSize,
          (page - 1) * pageSize + pageSize
        );
      }
      return reviews;
    },
  },
};

module.exports = productResolver;
