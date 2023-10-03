const { Review } = require("../../models");

const reviewResolver = {
  Query: {
    readReviews: async () => {
      return await Review.find({})
        .populate("product")
        .populate("user");
    },
    readReview: async (parent, { _id }) => {
      return await Review.findById(_id);
    },
  },
};

module.exports = reviewResolver;
