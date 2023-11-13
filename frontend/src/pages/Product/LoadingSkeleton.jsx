import React from 'react'
import { Skeleton } from '@mui/material'

const LoadingSkeleton = () => {
  return (
    {
      title: (
        <>
          <Skeleton
            variant="text"
            sx={{ fontSize: "48px" }}
            width={"100%"}
            animation="wave"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "48px" }}
            width={"60%"}
            animation="wave"
          />
        </>
      ),
      description: Array.from({ length: 3 }).map((_, index) => (
        <React.Fragment key={index}>
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            width={"100%"}
            animation="wave"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            width={"100%"}
            animation="wave"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            width={"60%"}
            animation="wave"
          />
        </React.Fragment>
      )),
      price: (
        <>
          <Skeleton
            variant="text"
            sx={{
              display: "inline-block",
              textAlign: "center",
              fontSize: "48px",
              verticalAlign: "middle",
            }}
            width={"100px"}
            animation="wave"
          />
        </>
      ),
      stock: 1,
      images: Array.from({ length: 8 }, (_, index) => ({
        url: "./images/products/template1x1.png",
      })),
      reviews: Array.from({ length: 5 }, (_, index) => ({
        title: `Loading ${index + 1}`,
        body: `Loading ${index + 1}`,
        rating: index + 1,
        user: { username: `Loading ${index + 1}` },
      })),
      ratingStats: {
        averageStars: 0,
        totalRatings: 0,
        stars: [0, 0, 0, 0, 0],
      },
      badges: {
        inStock: true,
      },
    }
  )
}

export default LoadingSkeleton