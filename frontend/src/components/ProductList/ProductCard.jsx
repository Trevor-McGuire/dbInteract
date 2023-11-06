import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarRating from "../StarRating";

import { Link } from "react-router-dom";
import Badges from "../Badges";

const formatPrice = (price) => {
  const [dollars, cents] = price.toFixed(2).split(".");
  return (
    <>
      <span>{dollars}</span>
      <sup style={{fontSize: "12px"}}>{cents}</sup>
    </>
  );
};

const ProductCard = ({ product }) => {
  const baseUrl = window.location.origin;
  const isValidId = product._id.length === 24;

  const totalStars = () => {
    let total = 0;
    product.ratingStats.reviews.forEach((review) => {
      total += review.rating;
    });
    return total;
  };
  return (
    <Link
      to={isValidId ? `/product/${product._id}` : "#"}
      disabled={!isValidId}
    >
      <Card>
        <CardHeader
          title={
            <Typography
              variant="title"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.2,
              }}
            >
              {product.title}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          sx={{ height: 194, width: "100%", objectFit: "contain" }}
          height="194"
          image={`${baseUrl}/${product.image}`}
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            ${formatPrice(product.price)}
            <span style={{ display: "inline-block", width: "12px" }}></span>
            <Badges badges={product.badges} />
          </Typography>
          <StarRating
            rating={product.ratingStats.averageStars}
            numReviews={product.ratingStats.totalReviews}
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
