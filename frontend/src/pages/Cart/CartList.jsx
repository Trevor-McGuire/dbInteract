import React from "react";
import RemoveFromCart from "./RemoveFromCart";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CartList = ({ cart }) => {
  const baseUrl = window.location.origin;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
          }}
        >
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart && cart.length > 0 ? (
            cart.reverse().map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Link to={`/product/${item.product._id}`}>
                    <img
                      height="100px"
                      src={`${baseUrl}/${item.product.images[0].url}`}
                      alt={item.product.title}
                    />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/product/${item.product._id}`}>
                    {item.product.title}
                  </Link>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.product.price}</TableCell>
                <TableCell>
                  <RemoveFromCart id={item._id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>Empty Cart</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartList;
