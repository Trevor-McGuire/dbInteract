import React from "react";
import { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { Slider, Hidden } from "@mui/material";

const ProductImageCarousel = ({ images }) => {
  const baseUrl = window.location.origin;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const containerRef = useRef(null);
  const startX = useRef(null);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleTouchStart = (e) => {
      startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (startX.current === null) return;
      if (e.target.localName !== "img") return;

      const currentX = e.touches[0].clientX;
      const deltaX = startX.current - currentX;

      if (deltaX > 5) {
        setSelectedImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      } else if (deltaX < -5) {
        setSelectedImageIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      }

      startX.current = null;
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [selectedImageIndex, images]);

  

  return (
    <Grid container columnSpacing={2}>
      {/* Thumbnails */}
      <Hidden smDown>
        <Grid
          item
          sx={{
            height: `calc(100vh - 64px - 2rem)`,
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
      </Hidden>

      {/* Main Image */}
      <Grid
        item
        xs
        ref={containerRef}
        sx={{ maxHeight: `calc(100vh - 64px - 2rem)` }}
      >
        <img
          src={`${baseUrl}/${images[selectedImageIndex].url}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
        <Slider
          aria-label="Picture"
          defaultValue={0}
          value={selectedImageIndex}
          onChange={(e, value) => setSelectedImageIndex(value)}
          step={1}
          min={0}
          max={images.length - 1}
        />
      </Grid>
    </Grid>
  );
};

export default ProductImageCarousel;
