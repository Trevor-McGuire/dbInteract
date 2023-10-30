import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

const ProductList = (props) => {
  const [products, setProducts] = useState(
    Array.from({ length: 10 }, () => ({
      averageStars: 0,
      image: "./images/products/template1x1.png",
      price: "###.##",
      ratingStats: {
        averageStars: 1,
        stars: [0, 0, 0, 0, 0, 0],
        totalReviews: 0,
      },
      title: "Loading...",
      _id: "5f5d2c5b7f3e4b0017b0d3ac",
    }))
  );

  useEffect(() => {
    if (props.products) {
      setProducts(props.products);
    }
  }, [props.products]);


  return (
    <Grid container spacing={2} padding={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;