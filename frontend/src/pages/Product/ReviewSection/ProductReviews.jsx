import React from 'react'
import { useState, useEffect, Fragment } from "react";
import { Box, Grid, Paper, Button } from "@mui/material";
import ProductRatings from "./ProductRatings";
import ReviewList from './ReviewList';

const ProductReviews = ({product, setProduct}) => {
  return (
    <Box id="review-section">
      <h3>Customer Reviews:</h3>
      <ProductRatings product={product}/>
      <ReviewList product={product} setProduct={setProduct}/>
    </Box>
  );
};

export default ProductReviews