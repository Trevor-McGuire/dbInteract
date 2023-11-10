import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: "auto",
        padding: "1rem",
        backgroundColor: "primary.main",
        color: "white",
        "& a": {
          color: "inherit",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          "& svg": {
            marginRight: "0.5rem",
          },
          "&:hover": {
            color: "secondary.dark",
          },
        },
      }}
    >
      <Grid
        container
        justifyContent="center"
      >
        <Grid item xs="auto"
        sx={{marginRight: "2rem"}}>
          <Typography variant="h4">About Creator</Typography>
          <Typography component="a" href="/about" color="inherit">
            <InfoIcon />
            About Myself
          </Typography>
          <Typography
            component="a"
            href="https://trevmcdev.com/"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LanguageIcon />
            My Portfolio
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h4">Contact Me</Typography>
          <Typography
            component="a"
            href="https://www.linkedin.com/in/trevor-mcguire-5b888725b/"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
            LinkedIn
          </Typography>
          <Typography
            component="a"
            href="mailto:tm@trevmcdev.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <EmailIcon />
            tm@trevmcdev.com
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
