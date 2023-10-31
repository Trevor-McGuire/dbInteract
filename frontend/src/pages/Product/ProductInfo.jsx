import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Input, InputAdornment } from "@mui/material";
import AddToCart from "./AddToCart";
import StarRating from "../../components/StarRating";
import Auth from "../../utils/auth";

import { Divider } from "@mui/material";
import Badges from "../../components/Badges";

const ProductInfo = ({ product }) => {
  const [fontSize, setFontSize] = useState(48);
  const titleRef = useRef(null);

  useEffect(() => {
    const titleHeight = titleRef.current.clientHeight;
    if (titleHeight > 120) {
      setFontSize(fontSize - 2);
    }
  }, [fontSize, product]);

  return (
    <Box
      // add space between elements
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "1rem",
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        className="product-title"
        ref={titleRef}
        sx={{
          maxHeight: `${fontSize * 5}px`,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          "-webkit-line-clamp": "5",
          "-webkit-box-orient": "vertical",
          fontSize: `${fontSize}px`,
        }}
      >
        {product.title}
      </Typography>
      <Divider />
      <Typography variant="h4" className="product-price">
        ${product.price}
      </Typography>
      <Divider />
      <Box>
        <StarRating
          rating={product.ratingStats.averageStars}
          numReviews={product.ratingStats.totalReviews}
        />
        <Badges badges={product.badges} />
      </Box>
      <Divider />
      {Auth.loggedIn() ? (
        <AddToCart productId={product._id} stock={product.stock} />
      ) : (
        <Typography variant="body1" className="product-quantity">
          Please <a href="/login">login</a> or <a href="/register">register</a>{" "}
          to add to cart.
        </Typography>
      )}
    </Box>
  );
};

export default ProductInfo;
