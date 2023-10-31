import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Box, Grid } from "@mui/material";

import { READ_PRODUCT } from "../../utils/queries";

import ReviewForm from "./ReviewSection/ReviewForm";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ReviewSection/ProductReviews";
import ProductDescription from "./ProductDescription";

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({
    title: "Loading...",
    description: "Loading...",
    price: "#.##",
    quantity: "##",
    images: Array.from({ length: 8 }, (_, index) => ({
      url: `./images/products/template1x1.png`,
    })),
    reviews: Array.from({ length: 5 }, (_, index) => ({
      title: `Loading ${index + 1}`,
      body: `Loading ${index + 1}`,
      rating: index + 1,
      user: { username: `Loading ${index + 1}` },
    })),
    ratingStats: {
      averageStars: 0,
      totalRatings: 0,
      stars: [0, 0, 0, 0, 0],
    },
  });

  const { data, error } = useQuery(READ_PRODUCT, {
    variables: { productId: productId },
  });
  useEffect(() => {
    if (data) {
      setProduct({
        ...data.getProductInfo,
        reviews: data.getProductReviews,
      });
    }
  }, [data]);

  if (error) return <p>{error.message}</p>;
  if (product.length === 0) return <p>No product found</p>;

  return (
    <Box
      sx={{
        margin: "auto",
        padding: "1rem",
      }}
    >
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
          <ProductImageCarousel images={product.images} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
          <ProductInfo product={product} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={2}>
          <ProductDescription product={product} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={5}>
          <ReviewForm />
          <ProductReviews product={product} setProduct={setProduct} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Product;
