import React from "react";
import { Typography, Link, List, ListItem, Box } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: "800px",
        marginX: "auto",
      }}
    >
      <Typography variant="h3">About Me</Typography>
      <Typography>
        Welcome to my website! My name is Trevor McGuire, and I'm passionate about web development.
        This website serves as a showcase of my skills and capabilities as a web developer. 
        Please visit my Portfolio for a in depth look at this project and others.
      </Typography>
      <Typography variant="h5">Contact Methods</Typography>
      <List>
        <ListItem>Email: <Link href="mailto:tm@trevmcdev.com">tm@trevmcdev.com</Link></ListItem>
        <ListItem>LinkedIn: <Link href="https://www.linkedin.com/in/trevor-mcguire-5b888725b/">Trevor McGuire</Link></ListItem>
        <ListItem>Portfolio: <Link href="https://trevmcdev.com/">https://trevmcdev.com/</Link></ListItem>
      </List>

      <Typography>
        Feel free to get in touch with me if you have any questions, inquiries, or if you'd like
        to collaborate on a project. I'm always open to new opportunities and challenges.
      </Typography>
    </Box>
  );
};

export default About;
