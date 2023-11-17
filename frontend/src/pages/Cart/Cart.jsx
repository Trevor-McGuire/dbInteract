import React from "react";
import CartList from "./CartList";
import OrderList from "./OrderList";
import Checkout from "./Checkout";
import { useQuery } from "@apollo/client";
import { Stack } from "@mui/material";
import { READ_CART_AND_ORDERS } from "../../utils/queries";

const Cart = () => {
  const { data } = useQuery(READ_CART_AND_ORDERS);
  const cart = data?.readUser?.cart || [];
  const orders = data?.readUser?.orders || [];

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        maxWidth: 800,
        margin: "auto",
      }}
    >
      <CartList cart={cart}/>
      {cart && cart.length ? <Checkout /> : null}
      <OrderList orders={orders}/>
    </Stack>
  );
};

export default Cart;
