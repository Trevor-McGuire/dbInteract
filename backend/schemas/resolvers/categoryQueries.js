const { Category, Product } = require("../../models");
const {
  generateCategoryString,
} = require("../../utils/generateCategoryString");

const categoryResolver = {
  Query: {
    getCategories: async () => {
      try {
        const categoryString = await generateCategoryString();
        return categoryString;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    getCategory: async (_, { identifier }) => {
      try {
        const category = await Category.findOne({ identifier }).populate({
          path: "products",
        });
        return category;
      } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
      }
    },
    getBestReviews: async () => {
      try {
        const EmptyCatSubcats = await Category.find({
          subCategories: { $size: 0 },
        }).populate({
          path: "products",
          populate: {
            path: "reviews",
            model: "Review",
          },
        });


        return categoriesWithEmptySubcategories;
      } catch (error) {
        console.error("Error fetching best reviews:", error);
        throw error;
      }
    },
  },
};

module.exports = categoryResolver;
