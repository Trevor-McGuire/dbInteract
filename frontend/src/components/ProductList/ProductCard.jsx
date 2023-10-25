import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const baseUrl = window.location.origin;
  console.log(product);
  return (
    <Link to={`/product/${product._id}`}>
      <Card sx={{ maxWidth: 345 }}>
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
          image={`${baseUrl}/${product.images[0].url}`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;