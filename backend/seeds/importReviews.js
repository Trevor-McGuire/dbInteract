const User = require("../models/User");
const Product = require("../models/Product");
const Review = require("../models/Review");
const mongoose = require("mongoose");

const importReviews = async () => {
  try {
    const users = await User.find();
    const products = await Product.find();
    for (const product of products) {
      const simRating = Math.random() * (4.9 - 3.7) + 3.7;
      const ratingDist = ratingDistribution(simRating);
      const numOfReviews = Math.floor(Math.random() * 300) + 10;
      const starRatingNums = startRatingNumbers(numOfReviews, ratingDist);
      const reviews = generateReviewText(starRatingNums, users, product);
      await Review.insertMany(reviews);
    }
    await associateReviewsToProducts();
  } catch (error) {
    console.error("Cast error details:", error.message);
  }
};

function ratingDistribution(simulatedRating) {
  let avg = 0;
  let deviation = 10;
  const distribution = [];

  while (Math.abs(avg - simulatedRating) > 0.1) {
    let totalWeight = 0;
    distribution.length = 0;

    for (let i = 1; i <= 5; i++) {
      const weight = Math.exp(
        -0.5 * Math.pow((i - simulatedRating) / deviation, 2)
      );
      distribution.push(weight);
      totalWeight += weight;
    }
    for (let i = 0; i < distribution.length; i++) {
      distribution[i] /= totalWeight;
    }
    avg = distribution.reduce(
      (acc, weight, index) => acc + weight * (index + 1),
      0
    );
    deviation *= 0.9;
  }
  return distribution;
}

const startRatingNumbers = (numOfReviews, ratingDist) => {
  let starRatingNumbers = ratingDist.map((number, index) => {
    return Math.round(number * numOfReviews);
  });
  starRatingNumbers = starRatingNumbers.map((number, index) => {
    // if any less than 5, add 5-10 reviews
    if (number < 5) {
      return number + Math.floor(Math.random() * 6) + 5;
    }
    return number;
  });

  return starRatingNumbers;
};

const generateReviewText = (starRatingNumbers, users, product) => {
  const reviews = [];
  while (starRatingNumbers.some((num) => num > 0)) {
    const randIndex = Math.floor(Math.random() * 5);
    if (starRatingNumbers[randIndex] === 0) continue;
    let reviewListItems = reviewList[randIndex];
    let reviewItems = Object.values(reviewListItems).map((item) => {
      return item[Math.floor(Math.random() * item.length)];
    });
    const title = `${reviewItems[0]} ${reviewItems[1]} ${reviewItems[2]}`;
    const body = `${reviewItems[3]} ${reviewItems[4]} ${reviewItems[5]}`;
    const user = users[Math.floor(Math.random() * users.length)];
    const review = {
      title,
      body,
      rating: randIndex + 1,
      user: new mongoose.Types.ObjectId(user._id),
      product: new mongoose.Types.ObjectId(product._id),
    };
    reviews.push(review);
    starRatingNumbers[randIndex]--;
  }
  return reviews;
};

const associateReviewsToProducts = async () => {
  try {
    const reviews = await Review.find();
    const products = await Product.find();
    for (const product of products) {
      const productReviews = reviews.filter(
        (review) => review.product.toString() === product._id.toString()
      );
      product.reviews = productReviews.map((review) => review._id);
      await product.save();
    }
  } catch (error) {
    console.error(error.message);
  }
};

const reviewList = [
  {
    titleOpening: ["Worst", "Terrible", "Awful"],
    titleClosing: ["product!", "experience!", "purchase!"],
    titleEmoji: ["😡", "😠", "👎"],
    bodyOpening: ["I regret not trying a different brand", "Purchasing this was a mistake", "Not recommended for anyone"],
    bodyMiddle: ["because it didn't meet expectations.", "due to its poor quality.", "as a result of disappointing performance."],
    bodyClosing: ["This product sucks.", "My decision was a letdown.", "The experience was subpar."],
    bodyEmoji: ["😔", "😞", "😣"],
  },
  {
    titleOpening: ["Not impressed", "Disappointing", "Letdown"],
    titleClosing: ["at best.", "by performance.", "by quality."],
    titleEmoji: ["😐", "😕", "👎"],
    bodyOpening: ["I expected more", "It fell short", "Unsatisfactory"],
    bodyMiddle: ["considering the high anticipation.", "given the investment.", "with the promised attributes."],
    bodyClosing: ["The hype was disappointing.", "The price was a letdown.", "The features were subpar."],
    bodyEmoji: ["😒", "😔", "😖"],
  },
  {
    titleOpening: ["Average", "Mediocre", "Meh"],
    titleClosing: ["at best.", "performance.", "quality."],
    titleEmoji: ["😐", "😕", "🤷‍♂️"],
    bodyOpening: ["Run of the mill", "I expected more", "It's okay"],
    bodyMiddle: ["considering the price.", "given the circumstances.", "with the available options."],
    bodyClosing: ["The price is reasonable.", "The features are satisfactory.", "It's worth what I paid for."],
    bodyEmoji: ["🙂", "😐", "😕"],
  },
  {
    titleOpening: ["Impressive", "Satisfactory", "Decent"],
    titleClosing: ["performance.", "purchase.", "product."],
    titleEmoji: ["👍", "😊", "🙂"],
    bodyOpening: ["I'm happy", "It met my expectations", "Worth it"],
    bodyMiddle: ["with the overall quality.", "considering the features.", "especially with the added benefits."],
    bodyClosing: ["My decision was the right one.", "The price is justified.", "It's exactly what I paid for."],    
    bodyEmoji: ["😄", "😃", "👍"],
  },
  {
    titleOpening: ["Excellent", "Outstanding", "Exceptional"],
    titleClosing: ["purchase.", "product.", "choice."],
    titleEmoji: ["🌟", "👏", "🙌"],
    bodyOpening: ["I'm thrilled","It exceeded my expectations","Highly recommended",],
    bodyMiddle: ["with the outstanding performance.", "considering the remarkable features.", "especially with the added advantages."],
    bodyClosing: ["My decision was the right one.", "The price is justified.", "It's exactly what I paid for."],    
    bodyEmoji: ["😁", "😃", "🌟"],
  },
];

module.exports = importReviews;
