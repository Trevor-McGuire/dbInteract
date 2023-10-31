import React, { useState } from 'react';
import { Box, Typography, Input, InputAdornment } from '@mui/material';
import AddToCart from './AddToCart';
import StarRating from '../../components/StarRating';
import Auth from '../../utils/auth';

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Box 
      // add space between elements
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <Typography variant="h4" className="product-title">
        {product.title}
      </Typography>
      <Typography variant="h4" className="product-price">
        ${product.price}
      </Typography>
      <StarRating rating={product.ratingStats.averageStars} numReviews={product.ratingStats.totalReviews} />
      <Typography variant="body1" className="product-quantity">
        In stock: {product.quantity}
      </Typography>
      {Auth.loggedIn() ? (
        <>
      <Input
        type="number"
        className="product-quantity-input"
        inputProps={{ min: 1, max: product.quantity }}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        endAdornment={<InputAdornment position="end">units</InputAdornment>}
        sx={{maxWidth: '100px'}}
      />
      <AddToCart productId={product._id} quantity={quantity} />
      </>
      ) : (
        <Typography variant="body1" className="product-quantity">
          Please <a href="/login">login</a> or <a href="/register">register</a> to add to cart.
        </Typography>
      )}
    </Box>
  );
};

export default ProductInfo;
