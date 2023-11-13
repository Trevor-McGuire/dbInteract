import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Input, InputAdornment, Link } from "@mui/material";
import AddToCart from "./AddToCart";
import StarRating from "../../components/StarRating";
import Auth from "../../utils/auth";

import { Divider } from "@mui/material";
import Badges from "../../components/Badges";

const ProductInfo = ({ product }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "1rem",
      }}
    >
      <Divider />
      <Typography variant="h4" className="product-price">
        ${product.price}
      </Typography>
      <Divider />
      <Box>
        <a href="#review-section">
          <StarRating
            rating={product.ratingStats.averageStars}
            numReviews={product.ratingStats.totalReviews}
          />
        </a>
        <Badges badges={product.badges} />
      </Box>
      <Divider />
      <AddToCart productId={product._id} stock={product.stock} />
    </Box>
  );
};

export default ProductInfo;
