import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box, Grid } from "@mui/material";
import ReviewForm from "./ReviewSection/ReviewForm";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ReviewSection/ProductReviews";
import ProductDescription from "./ProductDescription";
import { gql } from "@apollo/client";
import LoadingSkeleton from "./LoadingSkeleton";
import Title from "./Title";

const GET_PRODUCT_INFO = gql`
  query GetProductPageData($productId: ID!) {
    getProductInfo(productId: $productId) {
      _id
      title
      stock
      price
      description
      images {
        url
      }
      ratingStats {
        averageStars
        totalReviews
        stars
      }
      badges {
        inStock
      }
    }
  }
`;

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(LoadingSkeleton);

  const { data } = useQuery(GET_PRODUCT_INFO, {
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

  return (
    <Box>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <ProductImageCarousel images={product.images} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Title title={product.title} />
          <ProductInfo product={product} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <ProductDescription product={product} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <ReviewForm />
          <ProductReviews />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Product;
