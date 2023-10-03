import React, { useState } from 'react';

const ProductImageCarousel = ({ images }) => {
  const baseUrl = window.location.origin;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="product-image-carousel">
      <div className="main-image-container">
        <img
          src={`${baseUrl}/${images[selectedImageIndex].url}`}
          alt={images[selectedImageIndex].altText}
          className="main-image"
        />
      </div>
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={`${baseUrl}/${image.url}`}
            alt={image.altText}
            className={`thumbnail ${index === selectedImageIndex ? 'selected' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
