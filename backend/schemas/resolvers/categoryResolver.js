const { Category } = require("../../models");

const categoryResolver = {
  Query: {
    readCategories: async () => {
      return await Category.find({});
    },
    readCategoryById: async (parent, { _id }) => {
      return await Category.findById(_id);
    },
    readCategoryByName: async (parent, { name }) => {
      return await Category.findOne({ name: name });
    }
  },
};

module.exports = categoryResolver;
