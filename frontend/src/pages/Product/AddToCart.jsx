import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Input,
  InputAdornment,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_TO_CART } from "../../utils/mutations";
import { READ_CART_QUERY } from "../../utils/queries";

const AddToCart = ({ productId, stock }) => {
  const [quantity, setQuantity] = useState(1);

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
    <FormControl       sx={{
      width: "100%",
      maxWidth: "300px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}>
      <InputLabel id="purchase-quantity">Qty:</InputLabel>
      <Select
        labelId="purchase-quantity"
        value={quantity}
        label="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
      >
        {Array.from({ length: stock }, (_, i) => i + 1).map((quantity) => (
          <MenuItem key={quantity} value={quantity}>
            {quantity}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCartClick}
        disabled={loading || queryLoading}
      >
        {loading ? <CircularProgress size={24} /> : "Add to Cart"}
      </Button>
    </FormControl>
  );
};

export default AddToCart;
