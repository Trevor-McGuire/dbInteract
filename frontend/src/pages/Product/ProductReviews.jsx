import React from 'react'
import { useState, useEffect, Fragment } from "react";
import { useQuery } from "@apollo/client";
import { READ_REVIEW_BY_RATING } from "../../utils/queries";
import { Box, Grid, Paper, Button } from "@mui/material";

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
    console.log("reviewData", reviewData);
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
  const [totalReviews, setTotalReviews] = useState(
    product.stars.reduce((acc, cur) => acc + cur, 0)
  );
  return (
    <Box>
      <h3>Customer Reviews:</h3>

      <Paper elevation={5} sx={{}}>
        <Grid container spacing={1} columns={2}>
          {[...Array(5)].map((_, i) => (
            <Fragment key={`review${i}`}>
              <Grid item xs="auto">
                <Button
                  key={i}
                  sx={{
                    display: "block",
                  }}
                  onClick={() => setReviewRating(i + 1)}
                >
                  {[...Array(5)].map((_, j) => (
                    <i
                      key={`${i}${j}`}
                      className={`fa fa-star${j < i + 1 ? "" : "-o"}`}
                    ></i>
                  ))}{" "}
                  {product.stars[i + 1]} Reviews
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  sx={{
                    display: "block",
                    backgroundColor: "primary.main",
                    width:
                      (parseInt(product.stars[i]) / totalReviews) * 100 + "%",
                  }}
                  onClick={() => setReviewRating(i + 1)}
                >
                  x
                </Button>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Paper>
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