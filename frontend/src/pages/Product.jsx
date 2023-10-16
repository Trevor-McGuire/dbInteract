import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../style/Product.sass";
import AddToCart from "../components/AddToCart";
import { READ_PRODUCTS } from "../utils/queries";
import ReviewForm from "../components/ReviewForm";
import { Box, Grid, Paper, Avatar } from "@mui/material";
import { useState } from "react";

const Product = () => {
  const baseUrl = window.location.origin;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };
  const { productId } = useParams();
  const [quantity, setQuantity] = React.useState(1);

  const { data, loading, error } = useQuery(READ_PRODUCTS, {
    variables: { id: productId },
  });
  const product = data?.readProducts[0] || {};
  const { images } = product;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (product.length === 0) return <p>No product found</p>;

  const ProductImageCarousel = () => {
    return (
      <div>
        <img
          src={`${baseUrl}/${images[selectedImageIndex].url}`}
          alt={images[selectedImageIndex].altText}
          style={{ width: "100%", height: "auto" }}
        />
        {images.map((image, index) => (
          <img
            key={index}
            src={`${baseUrl}/${image.url}`}
            alt={image.altText}
            onClick={() => handleThumbnailClick(index)}
            style={{
              cursor: "pointer",
              marginRight: "8px",
              marginBottom: "8px",
              width: "100px",
            }}
          />
        ))}
      </div>
    );
  };

  const ProductInfo = () => {
    return (
      <div>
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-quantity">In stock: {product.quantity}</p>
        <input
          max={product.quantity}
          min={1}
          defaultValue={1}
          type="number"
          className="product-quantity-input"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <AddToCart productId={product._id} quantity={quantity} />
      </div>
    );
  };

  const ProductReviews = () => {
    return (
      <div>
        <h3>Customer Reviews:</h3>
        <ul>
          <ReviewForm />
          {product.ratings.map((rating, index) => (
            <li key={index}>
              <strong>{rating.title}</strong>
              <p>{rating.body}</p>
              <p>
                Rating:{" "}
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fa fa-star${i < rating.rating ? "" : "-o"}`}
                  ></i>
                ))}
              </p>
              <p>By: {rating.user.username}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "2rem auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8} lg={5} xl={5}>
          <ProductImageCarousel />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
          <ProductInfo />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
          <ProductReviews />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Product;
