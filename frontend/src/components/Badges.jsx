import React from "react";
import { Box, Chip, Avatar } from "@mui/material";

const Badges = ({ badges }) => {
  const { inStock } = badges;

  return (
    <Chip
      variant="outlined"
      color="primary"
      size="small"
      avatar={<Avatar>In</Avatar>}
      label="Stock"
    />
  );
};

export default Badges;
