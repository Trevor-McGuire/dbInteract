import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_FROM_CART } from "../utils/mutations";
import { READ_CART_QUERY } from "../utils/queries";

function RemoveFromCart({ id }) {
  console.log("id", id);
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART, {
    variables: { cartItemId: id },
  });

  const handleRemoveFromCart = async () => {
    try {
      const { data } = await removeFromCart({
        id,
        refetchQueries: [{ query: READ_CART_QUERY }],
      });
      console.log("data", data);
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
