import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, Button, ListItemIcon } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; // Import the icon

const ProductInfo = ({ product }) => {
  const [showMore, setShowMore] = useState(false);
  const linesToShow = showMore ? product.description.length : 3;

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <Box>
      <List dense>
        {product.description.slice(0, linesToShow).map((description, index) => (
          <ListItem key={index} component="div">
            <ListItemIcon>
              <FiberManualRecordIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={description} />
          </ListItem>
        ))}
      </List>
      {product.description.length > 3 && (
        <Button onClick={handleToggle} size="small">
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </Box>
  );
};

export default ProductInfo;
