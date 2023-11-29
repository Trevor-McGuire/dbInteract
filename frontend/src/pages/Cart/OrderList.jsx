import React from "react";
import OrderListSub from "./OrderListSub";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const OrderList = ({ orders }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <TableRow>
            <TableCell>Order #</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <React.Fragment key={order._id}>
                <TableRow
                  id={`row-${order._id}`}
                  onClick={() => {
                    document
                      .querySelector(`#row-${order._id}`)
                      .nextElementSibling.classList.toggle("w3-hide");
                  }}
                >
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {new Date(
                      parseInt(order.purchaseDate)
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.cart.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </TableCell>
                </TableRow>
                <OrderListSub order={order} />
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No orders yet</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;
