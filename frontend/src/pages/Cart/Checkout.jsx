import React from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { Button } from "@mui/material";
import { READ_CART_AND_ORDERS } from "../../utils/queries";

const CHECKOUT = gql`
  mutation Checkout {
    checkout {
      _id
    }
  }
`;

const Checkout = () => {
  const [checkout] = useMutation(CHECKOUT);

  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      await checkout({
        refetchQueries: [{ query: READ_CART_AND_ORDERS }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      color="secondary"
      onClick={handleCheckout}
    >
      Checkout
    </Button>
  );
};

export default Checkout;
