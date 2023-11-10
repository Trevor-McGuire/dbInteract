import React from "react";
import { useMutation } from "@apollo/client";
import { CHECKOUT } from "../../utils/mutations";

const Checkout = () => {
  const [checkout] = useMutation(CHECKOUT);

  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const { data } = await checkout();
      window.location.reload();
    } catch (e) {
      console.error(e);
    }  
  };
  return (
    <form
      onSubmit={handleCheckout}
      className='w3-container w3-margin w3-center'
    >
      <button 
        type="submit"
        className="
          w3-button 
          w3-padding-large 
          w3-hover-white 
          w3-xxlarge 
          w3-round-large
          w3-yellow
          w3-border
          w3-card-4
          w3-margin
        "
      >Checkout</button>
    </form>
  );
};

export default Checkout;