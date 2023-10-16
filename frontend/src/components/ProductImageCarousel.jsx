import React, { useState } from 'react';
import { Paper, Grid } from '@mui/material';

const ProductImageCarousel = ({ images }) => {
  const baseUrl = window.location.origin;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <Paper className="product-image-carousel" elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            src={`${baseUrl}/${images[selectedImageIndex].url}`}
            alt={images[selectedImageIndex].altText}
            className="main-image"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={6} className="thumbnail-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={`${baseUrl}/${image.url}`}
                alt={image.altText}
                className={`thumbnail ${index === selectedImageIndex ? 'selected' : ''}`}
                onClick={() => handleThumbnailClick(index)}
                style={{ cursor: 'pointer', marginRight: '8px', marginBottom: '8px' }}
              />
            ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductImageCarousel;
