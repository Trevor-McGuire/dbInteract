import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TO_CART } from '../../utils/mutations';
import { READ_CART_QUERY } from '../../utils/queries';

const AddToCart = ({ productId, quantity }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART);
  const { loading: queryLoading } = useQuery(READ_CART_QUERY);

  const handleAddToCartClick = async () => {
    try {
      await addToCart({
        variables: { productId, quantity: parseInt(quantity) },
        refetchQueries: [{ query: READ_CART_QUERY }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddToCartClick} disabled={loading || queryLoading}>
        {loading ? <CircularProgress size={24} /> : 'Add to Cart'}
      </Button>
    </div>
  );
};

export default AddToCart;
