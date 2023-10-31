import React from 'react';
import { Box, Typography, Rating as MuiRating } from '@mui/material';

const StarRating = ({ rating, numReviews }) => {
  return (
    <Box display="flex" alignItems="center">
      <MuiRating
        name="read-only"
        value={rating}
        precision={0.5}
        readOnly
        sx={{ mr: 1 }}
      />
      <Typography variant="body2" color="textSecondary">
        ({numReviews} reviews)
      </Typography>
    </Box>
  );
};

export default StarRating;
