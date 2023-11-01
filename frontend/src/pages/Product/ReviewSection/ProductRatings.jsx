import React from "react";
import { Paper, Grid, Box } from "@mui/material";
import StarRating from "../../../components/StarRating";

const ProductRatings = ({ stats, reviewState, setReviewState }) => {

  const percentage = (i) =>
    parseInt(
      (stats.stars[4 - i] / stats.totalReviews) *
        100
    ) + "%";
  
  const handleReviewState = (rating) => {
    setReviewState({
      ...reviewState,
      rating: rating,
      page: 1,
    });
  }

  return (
    <Paper elevation={5} sx={{ width: "300px", padding: "1rem" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          <Grid
            container
            padding
            borderRadius={2}
            onClick={() => handleReviewState(null)}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "primary.light",
              },
              backgroundColor: reviewState.rating === null ? "primary.light" : "",
            }}
          >
            <StarRating
              rating={stats.averageStars}
              numReviews={stats.totalReviews}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {[...Array(5)].map((_, i) => (
            <Grid
              container
              padding
              borderRadius={2}
              key={5 - i}
              onClick={() => handleReviewState(5 - i)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
                backgroundColor: reviewState.rating === 5 - i ? "primary.light" : "",
              }}
            >
              <Grid item xs={3}>
                {5 - i}&nbsp;Stars
              </Grid>
              <Grid
                item
                xs={7}
                sx={{
                  backgroundColor: "primary.secondary",
                  width: "100%",
                  outline: "1px solid black",
                  borderRadius: "5px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    width: percentage(i),
                  }}
                >
                  &nbsp;
                </Box>
              </Grid>
              <Grid item xs={2} paddingLeft={1}>
                {percentage(i)}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductRatings;
