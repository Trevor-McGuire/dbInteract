import React from 'react'
import { Box } from '@mui/system'
import AddToCart from './AddToCart'

const ProductInfo = ({product}) => {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <Box>
      <p className="product-description">{product.description}</p>
    </Box>
  );
};

export default ProductInfo