import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrderListSub = ({ order }) => {
  const baseUrl = window.location.origin;

  return (
    <TableRow className="w3-hide">
      <TableCell colSpan={4}> {/* Span the columns to match the parent table */}
        <TableContainer>
          <Table className="w3-table-all w3-centered">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.cart &&
                order.cart.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="w3-hover-opacity w3-hover-outline">
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
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableCell>
    </TableRow>
  );
};

export default OrderListSub;
