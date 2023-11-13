import React from "react";
import { Box, Pagination } from "@mui/material";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews, reviewState, setReviewState, stats }) => {
  const handleChange = (event, value) => {
    setReviewState({ ...reviewState, page: value });
  };

  const maxPages =
    reviewState.rating === null
      ? Math.ceil(stats.totalReviews / reviewState.pageSize)
      : Math.ceil(stats.stars[reviewState.rating - 1] / reviewState.pageSize);

  return (
    <Box>
      {reviews.map((review, index) => (
        <ReviewCard review={review} index={index} />
      ))}
      <Pagination
        count={maxPages}
        page={reviewState.page}
        onChange={handleChange}
        color="primary"
      />
    </Box>
  );
};

export default ReviewList;
