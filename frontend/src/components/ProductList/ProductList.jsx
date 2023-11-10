import React from "react";
import { Grid, Skeleton } from "@mui/material";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";

const ProductList = (props) => {
  const [products, setProducts] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      _id: index,
      averageStars: 0,
      image: (
        <Skeleton
          variant="rectangular"
          sx={{ fontSize: "1rem" }}
          width={"100%"}
          animation="wave"
        />
      ),
      price: 0,
      ratingStats: {
        averageStars: 1,
        stars: [0, 0, 0, 0, 0, 0],
        totalReviews: 0,
      },
      title: (
        <>
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            width={"100%"}
            animation="wave"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            width={"60%"}
            animation="wave"
          />
        </>
      ),
      badges: {
        inStock: true,
      },
    }))
  );

  useEffect(() => {
    if (props.products) {
      setProducts(props.products);
    }
  }, [props.products]);

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} >
        <Pagination />
      </Grid>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
