import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useMutation, useQuery } from "@apollo/client";
import { READ_USER } from "../../utils/queries";
import { gql } from "@apollo/client";
import Auth from "../../utils/auth";

const ADD_TO_CART = gql`
  mutation Mutation($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      username
    }
  }
`;

const REGISTER_GUEST = gql`
  mutation Mutation {
    registerGuest {
      token
    }
  }
`;

const AddToCart = ({ productId, stock }) => {
  const [quantity, setQuantity] = useState(1);

  const [addToCart, { loading }] = useMutation(ADD_TO_CART);
  const [registerGuest] = useMutation(REGISTER_GUEST);
  const { loading: queryLoading } = useQuery(READ_USER);

  const handleAddToCartClick = async () => {
    console.log("handleAddToCartClick")
    try {
      if (!Auth.loggedIn()) {
        const { data } = await registerGuest({
          refetchQueries: [{ query: READ_USER }],
        });
        Auth.login(data.registerGuest.token);
      }
      await addToCart({
        variables: {
          productId,
          quantity: parseInt(quantity),
        },
        refetchQueries: [{ query: READ_USER }],
      });
      window.location.assign("/cart")
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <FormControl
      sx={{
        gap: "1rem",
      }}
    >
      <InputLabel id="purchase-quantity">Qty:</InputLabel>
      <Select
        labelId="purchase-quantity"
        value={quantity}
        label="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
        sx={{ width: "100px" }}
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
        sx={{ width: "200px" }}
      >
        {loading ? <CircularProgress size={24} /> : "Add to Cart"}
      </Button>
    </FormControl>
  );
};

export default AddToCart;
