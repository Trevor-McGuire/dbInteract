import React, { useState, useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import { useQuery } from '@apollo/client';
import { READ_REVIEW_BY_RATING } from "../../../utils/queries";


const ReviewList = ({product, setProduct}) => {
  const [reviewRating, setReviewRating] = useState(null);
  const { data: reviewData } = useQuery(READ_REVIEW_BY_RATING, {
    variables: { productId: product._id, rating: reviewRating },
    skip: reviewRating === null,
  });
  useEffect(() => {
    if (reviewData) {
      setProduct((prev) => ({
        ...prev,
        reviews: reviewData.getProductReviews,
      }));
    }
  }, [reviewData]);

  const [showFullText, setShowFullText] = useState(
    Array.from({ length: product.reviews.length }, (_, index) => false)
  );

  const toggleShowFullText = (index) => {
    setShowFullText((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Box>
      {product.reviews.map((rating, index) => (
        <Paper elevation={2} sx={{}} key={index}>
          <strong>{rating.title}</strong>
          <p>
            Rating:{" "}
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fa fa-star${i < rating.rating ? "" : "-o"}`}
              ></i>
            ))}{" "}
            By: {rating.user.username}
          </p>
          {showFullText[index] ? (
            <p>{rating.body}</p>
          ) : (
            <p>
              {rating.body.length > 50
                ? `${rating.body.slice(0, 50)}...`
                : rating.body}
              {rating.body.length > 50 && (
                <span
                  style={{ color: "blue" }}
                  onClick={() => toggleShowFullText(index)}
                >
                  Show more
                </span>
              )}
            </p>
          )}
        </Paper>
      ))}
    </Box>
  )
}

export default ReviewList