import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../style/Product.sass";
import AddToCart from "../components/AddToCart";
import { READ_PRODUCT, READ_REVIEW_BY_RATING } from "../utils/queries";
import ReviewForm from "../components/ReviewForm";
import { Box, Grid, Paper, Avatar, Button } from "@mui/material";
import Item from "@mui/material/ListItem";
import { useState, useEffect } from "react";

const Product = () => {
  const baseUrl = window.location.origin;

  const { productId } = useParams();
  const [quantity, setQuantity] = React.useState(1);

  const [product, setProduct] = useState({
    title: "Loading...",
    description: "Loading...",
    price: "#.##",
    quantity: "##",
    images: Array.from({ length: 8 }, (_, index) => ({
      url: `./images/products/template1x1.png`,
    })),
    reviews: [],
    stars: [0, 0, 0, 0, 0, 0],
  });
  const [reviews, setReviews] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      title: `Loading ${index + 1}`,
      body: `Loading ${index + 1}`,
      rating: index + 1,
      user: { username: `Loading ${index + 1}` },
    }))
  );
  const { data, error } = useQuery(READ_PRODUCT, {
    variables: { productId: productId },
  });

  useEffect(() => {
    if (data) {
      setProduct(data.getProductInfo || {});
      setReviews(data.getProductReviews || []);
    }
  }, [data]);

  if (error) return <p>{error.message}</p>;
  if (product.length === 0) return <p>No product found</p>;

  const ProductImageCarousel = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const handleThumbnailClick = (index) => {
      setSelectedImageIndex(index);
    };
    const { images } = product;

    return (
      <Grid container columnSpacing={2}>
        {/* Thumbnails */}
        <Grid
          id="asdf"
          item
          xs="auto"
          sx={{
            maxHeight: `calc(100vh - 64px - 2rem)`,
            overflowY: "auto",
          }}
        >
          <Grid container direction="column" spacing={1}>
            {images.map((image, index) => (
              <Grid item key={index}>
                <img
                  src={`${baseUrl}/${image.url}`}
                  onClick={() => handleThumbnailClick(index)}
                  style={{
                    cursor: "pointer",
                    width: "80px",
                    maxHeight: "80px",
                    objectFit: "contain",
                    borderRadius: "5px",
                    padding: "2px",
                    border:
                      index === selectedImageIndex
                        ? "2px solid blue"
                        : "2px solid gray",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Main Image */}
        <Grid
          item
          xs
          sx={{ maxHeight: "100%", maxHeight: `calc(100vh - 64px - 2rem)` }}
        >
          <img
            src={`${baseUrl}/${images[selectedImageIndex].url}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const ProductInfo = () => {
    return (
      <Box>
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
      </Box>
    );
  };

  const ProductReviews = () => {
    const [reviewRating, setReviewRating] = useState(null);
    const { data: reviewData } = useQuery(READ_REVIEW_BY_RATING, {
      variables: { productId: productId, rating: reviewRating },
      skip: reviewRating === null,
    });
    useEffect(() => {
      if (reviewData) {
        setReviews(reviewData.getProductReviews || []);
      }
    }, [reviewData]);

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
    const [totalReviews, setTotalReviews] = useState(
      product.stars.reduce((acc, cur) => acc + cur, 0)
    );
    return (
      <Box>
        <h3>Customer Reviews:</h3>

        <Paper elevation={5} sx={{}}>
          <Grid container>
            <Grid item xs="auto">
              {[...Array(5)].map((_, i) => (
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
                  {product.stars[i]} Reviews
                </Button>
              ))}
            </Grid>
            <Grid item xs>
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "block",
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                    // width: parseInt((product.stars[i] / totalReviews)*100) + "%",
                    width: "100%",
                  }}
                  onClick={() => setReviewRating(i + 1)}
                  
                >
                   {parseInt((product.stars[i] / totalReviews)*100) + "%"}
                </Box>
              ))}
            </Grid>
          </Grid>
        </Paper>
        {reviews.map((rating, index) => (
          <Paper elevation={2} sx={{}} key={index}>
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
      </Box>
    );
  };

  return (
    <Box
      sx={{
        margin: "auto",
        padding: "1rem",
      }}
    >
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} sm={8} md={8} lg={5} xl={5}>
          <ProductImageCarousel />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
          <ProductInfo />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={5}>
          <ReviewForm />
          <ProductReviews />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Product;
