import React from 'react'
import { useState, useEffect, Fragment } from "react";
import { useQuery } from "@apollo/client";
import { READ_REVIEW_BY_RATING } from "../../../utils/queries";
import { Box, Grid, Paper, Button } from "@mui/material";
import ProductRatings from "./ProductRatings";

const ProductReviews = ({product, setProduct}) => {
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
      <h3>Customer Reviews:</h3>
      <ProductRatings product={product}/>
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
  );
};

export default ProductReviews