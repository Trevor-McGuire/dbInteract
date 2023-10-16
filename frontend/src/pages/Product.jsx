import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../style/Product.sass";
import AddToCart from "../components/AddToCart";
import { READ_PRODUCTS, READ_REVIEW_BY_RATING } from "../utils/queries";
import ReviewForm from "../components/ReviewForm";
import { Box, Grid, Paper, Avatar, Button } from "@mui/material";
import { useState, useEffect } from "react";

const Product = () => {
  const baseUrl = window.location.origin;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { productId } = useParams();
  const [quantity, setQuantity] = React.useState(1);

  const [product, setProduct] = useState({
    title: "Loading...",
    description: "Loading...",
    price: "#.##",
    quantity: "##",
    images: [],
    reviews: [],
    stars: [0, 0, 0, 0, 0, 0],
  });
  const [images, setImages] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      url: `./images/products/template1x1.png`,
      altText: `Loading ${index + 1}`,
    }))
  );
  const [reviews, setReviews] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      title: `Loading ${index + 1}`,
      body: `Loading ${index + 1}`,
      rating: index + 1,
      user: { username: `Loading ${index + 1}` },
    }))
  );
  const { data, error } = useQuery(READ_PRODUCTS, {
    variables: { productId: productId },
  });



  useEffect(() => {
    if (data) {
      setProduct(data.getProductInfo || {});
      setImages(data.getProductImages || []);
      setReviews(data.getProductReviews || []);
    }
  }, [data]);


  const [reviewRating, setReviewRating] = useState(null);

  const { data: reviewData, error: reviewError } = useQuery(
    READ_REVIEW_BY_RATING,
    {
      variables: { productId: productId, rating: reviewRating },
    }
  );
  useEffect(() => {
    if (reviewData) {
      setReviews(reviewData.getProductReviews || []);
    }
  }, [reviewData]);

  if (error) return <p>{error.message}</p>;
  if (product.length === 0) return <p>No product found</p>;

  const ProductImageCarousel = () => {
    const handleThumbnailClick = (index) => {
      setSelectedImageIndex(index);
    };
    return (
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <img
          src={`${baseUrl}/${images[selectedImageIndex].url}`}
          alt={images[selectedImageIndex].altText}
          style={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            padding: "8px",
          }}
        >
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
                filter: index === selectedImageIndex ? "brightness(0.5)" : "",
                border: index === selectedImageIndex ? "10px solid blue" : "",
              }}
            />
          ))}
        </div>
        <div>
          <button onClick={() => handleNavigation("left")}>Left</button>
          <button onClick={() => handleNavigation("right")}>Right</button>
        </div>
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
    const [showFullText, setShowFullText] = useState(
      Array.from({ length: reviews.length }, (_, index) => false)
    );

    const toggleShowFullText = (index) => {
      setShowFullText((prev) => {
        const newState = [...prev];
        newState[index] = !newState[index];
        return newState;
      });
    };
    return (
      <div>
        <h3>Customer Reviews:</h3>
        <ReviewForm />
        <Paper
          elevation={5}
          sx={{
            margin: "1rem 0",
            padding: "1rem",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <Button
              key={i}
              sx={{
                display: "block",
              }}
              onClick={() => setReviewRating(i)}
            >
              {[...Array(5)].map((_, j) => (
                <i
                  key={`${i}${j}`}
                  className={`fa fa-star${j < i ? "" : "-o"}`}
                ></i>
              ))}{" "}
              {product.stars[i]} Reviews
            </Button>
          ))}
        </Paper>
        {reviews.map((rating, index) => (
          <Paper
            elevation={2}
            sx={{
              margin: "1rem 0",
              padding: "1rem",
            }}
            key={index}
          >
            <strong>{rating.title}</strong>
            <p>
              Rating:{" "}
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star${i < rating.rating ? "" : "-o"}`}
                ></i>
              ))}{" "}
              By: {rating.user.username}
            </p>
            {showFullText[index] ? (
              <p>{rating.body}</p>
            ) : (
              <p>
                {rating.body.length > 50
                  ? `${rating.body.slice(0, 50)}...`
                  : rating.body}
                {rating.body.length > 50 && (
                  <span
                    style={{ color: "blue" }}
                    onClick={() => toggleShowFullText(index)}
                  >
                    Show more
                  </span>
                )}
              </p>
            )}
          </Paper>
        ))}
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
