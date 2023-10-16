const { User, Product, CartItem, Order, Review } = require("../../models");

const userResolver = {
  Mutation: {
    addReview: async (parent, { input }, context) => {
      const user = await User.findById(context.user.data._id);
      input.user = user._id;
  
      const product = await Product.findById(input.product);
  
      const review = await Review.create({
        ...input,
      });
  
      console.log("user.reviews", user.reviews);
      console.log("product.reviews", product.reviews);

      user.reviews.push(review._id);
      product.reviews.push(review._id);
  
      await user.save();
      await product.save();
  
      return review;
    },
  
    updateReview: async (parent, { input }, context) => {
      console.log("updateReview", input)
      const review = await Review.findByIdAndUpdate(
        input.reviewId,
        {
          title: input.title,
          body: input.body,
          rating: input.rating,
        },
        { new: true }
      );
  
      if (!review) throw new Error("Review not found");
  
      return review;
    },
  
    deleteReview: async (parent, { reviewId }, context) => {
      const userId = context.user.data._id;

      const review = await Review.findByIdAndDelete(reviewId);
      if (!review) throw new Error("Review not found");
  
      const user = await User.findByIdAndUpdate(
        review.userId,
        { $pull: { reviews: review._id } },
        { new: true }
      );
  
      const product = await Product.findByIdAndUpdate(
        review.productId,
        { $pull: { reviews: review._id } },
        { new: true }
      );
  
      return review;
    },
  },
};

module.exports = userResolver;
