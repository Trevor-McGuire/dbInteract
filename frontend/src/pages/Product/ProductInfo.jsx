import React from 'react'
import { Box } from '@mui/system'
import AddToCart from './AddToCart'

const ProductInfo = ({product}) => {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <Box>
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-quantity">In stock: {product.quantity}</p>
      <input
        max={product.quantity}
        min={1}
        defaultValue={1}
        type="number"
        className="product-quantity-input"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <AddToCart productId={product._id} quantity={quantity} />
    </Box>
  );
};

export default ProductInfo