import React from "react";
import { useMutation } from "@apollo/client";
import { READ_USER } from "../../utils/queries";
import { gql } from "@apollo/client";

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
      const { data } = await removeFromCart({
        id,
        refetchQueries: [{ query: READ_USER }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button type="button" disabled={loading} onClick={handleRemoveFromCart} 
      className="w3-red w3-button w3-padding w3-hover-darken w3-large w3-round"
    >
      Delete
    </button>
  );
}

export default RemoveFromCart;
