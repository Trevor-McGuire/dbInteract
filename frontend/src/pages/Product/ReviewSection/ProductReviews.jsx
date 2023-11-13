import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import ProductRatings from "./ProductRatings";
import ReviewList from "./ReviewList";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";


export const READ_REVIEWS_AND_GET_PRODUCT_INFO = gql`
  query Query($input: readReviewsInput, $productId: ID!) {
    readReviews(input: $input) {
        body
        rating
        title
        user {
          username
        }
    }
    getProductInfo(productId: $productId) {
          ratingStats {
          averageStars
          totalReviews
          stars
        }
    }
  }
`;


const ProductReviews = () => {
  const productId = useParams().productId;

  const [reviewState, setReviewState] = useState({
    rating: null,
    page: 1,
    pageSize: 5,
  });

  const { loading, data } = useQuery(READ_REVIEWS_AND_GET_PRODUCT_INFO, {
    variables: {
      input: {
        productId: productId,
        rating: reviewState.rating,
        page: reviewState.page,
        pageSize: reviewState.pageSize,
      },
      productId: productId,
    },
  });

  const [reviews, setReviews] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      title: `Loading ${index + 1}`,
      body: `Loading ${index + 1}`,
      rating: index + 1,
      user: { username: `Loading ${index + 1}` },
    }))
  );

  const [stats, setStats] = useState({
    averageStars: 0,
    totalReviews: 0,
    stars: [0, 0, 0, 0, 0],
  });

  useEffect(() => {
    if (data) {
      setStats(data.getProductInfo.ratingStats);
      setReviews(data.readReviews);
      setReviewState({
        ...reviewState,
        maxPages: Math.ceil(data.getProductInfo.ratingStats.totalReviews / reviewState.pageSize),
      });
    }
    if (loading) {
      setReviews(
        Array.from({ length: 5 }, (_, index) => ({
          title: <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={120} animation="wave"/>,
          body: <Skeleton variant="text" sx={{ fontSize: "1rem" }}  animation="wave"/>,
          rating: index + 1,
          user: { username: <Skeleton variant="text" sx={{ display: "inline-block", fontSize: "1rem" }} width={120} animation="wave"/> },
        }))
      );
    }
  }, [data]);

  console.log("reviewData", reviews);
  console.log("stats", stats);

  return (
    <Box id="review-section">
      <h3>Customer Reviews:</h3>
      <ProductRatings
        stats={stats}
        reviewState={reviewState}
        setReviewState={setReviewState}
      />
      <ReviewList 
        reviews={reviews}
        reviewState={reviewState}
        setReviewState={setReviewState}
        stats={stats}
      />
    </Box>
  );
};

export default ProductReviews;
