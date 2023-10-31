import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@mui/material";
import {
  Grid,
  Button,
  Typography,
} from "@mui/material";

function getCurrentSeason() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns a zero-based index
  let season = "";
  switch (true) {
    case currentMonth >= 3 && currentMonth <= 5:
      season = "Spring";
      break;
    case currentMonth >= 6 && currentMonth <= 8:
      season = "Summer";
      break;
    case currentMonth >= 9 && currentMonth <= 11:
      season = "Fall";
      break;
    default:
      season = "Winter";
  }
  const currentYear = currentDate.getFullYear();
  return `${season} ${currentYear}`;
}

const HeaderImage = () => {
  const baseUrl = window.location.origin;
  const seasonAndYear = getCurrentSeason();

  return (
    <Grid
      container
      component={Link}
      to="/category/electronics"
      sx={{
        backgroundImage: `url(${baseUrl}/images/categories/electronics1BG.png)`,
        height: `calc(100vh - 64px)`,
      }}
    >
      <Grid
        item
        xs={12}
        sm="auto"
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 1rem",
        }}
      >
        <Typography variant="h4" color="text.primary">
          New arrivals
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`${seasonAndYear} Collection`}
        </Typography>
        <Button variant="contained" sx={{
          backgroundColor: "primary.main",
          color: "white",
          padding: "0.5rem 1rem",
          margin: "1rem 0",
          width: "fit-content",
          alignSelf: "center",
        }}>
          SHOP ELECTRONICS
        </Button>
      </Grid>

      <Grid item xs={12} sm>
        <img
          src={`${baseUrl}/images/categories/electronics1.png`}
          alt="Electronics"
          style={{
            width: "100%",
            height: "100%",
            maxHeight: `calc(100vh - 64px)`,
            objectFit: "contain",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default HeaderImage;
