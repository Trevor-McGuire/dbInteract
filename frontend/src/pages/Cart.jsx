import React from "react";
import CartList from "../components/CartList";
import OrderList from "../components/OrderList";


const Cart = () => {


  return (
    <div
      className="w3-container w3-content w3-padding-64"
      
    >
      <CartList />
      <OrderList />
    </div>
  );
};

export default Cart;
