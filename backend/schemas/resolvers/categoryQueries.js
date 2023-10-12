const { Category } = require("../../models");

const categoryResolver = {
  Query: {
    readCategories: async () => {
      return await Category.find({});
    },
  },
};

module.exports = categoryResolver;
