import React from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { Button } from "@mui/material";
import { READ_CART_AND_ORDERS } from "../../utils/queries";

const REMOVE_FROM_CART = gql`
  mutation Mutation($cartItemId: ID!) {
    removeFromCart(cartItemId: $cartItemId) {
      _id
    }
  }
`;

function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART, {
    variables: { cartItemId: id },
  });

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart({
        id,
        refetchQueries: [{ query: READ_CART_AND_ORDERS }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      type="button"
      disabled={loading}
      onClick={handleRemoveFromCart}
      variant="contained"
      color="error"
      size="large"
    >
      Delete
    </Button>
  );
}

export default RemoveFromCart;
