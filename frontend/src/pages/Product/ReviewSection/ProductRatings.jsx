import React from 'react'
import { Grid, Paper, Button } from '@mui/material'
import { useState, useEffect, Fragment } from "react";

const ProductRatings = ({product}) => {
  return (
    <Paper elevation={5} sx={{maxWidth: "300px",}}>
    <Grid container spacing={1} columns={2} >
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
              {product.ratingStats.totalReviews} Reviews
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              sx={{
                display: "block",
                backgroundColor: "primary.main",
                width:
                  (parseInt(product.ratingStats.stars[i]) / product.ratingStats.totalReviews) * 100 + "%",
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
  )
}

export default ProductRatings