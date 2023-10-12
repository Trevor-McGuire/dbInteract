import React from "react";
import { useQuery } from "@apollo/client";
import { READ_ORDERS } from "../utils/queries";
import OrderListSub from "./OrderListSub";

const OrderList = () => {
  const { data, loading, error } = useQuery(READ_ORDERS);
  const orders = data?.readUser?.orders || [];
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;
  if (!orders.length) return <h2>No orders yet</h2>;

  return (
    <table id="order-list-component" className="w3-table-all w3-centered">
      <thead>
        <tr>
          <th>Order #</th>
          <th>Date</th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <React.Fragment key={order._id}>
            <tr
              id={`row-${order._id}`}
              className="w3-hover-darken"
              onClick={() => {
                document
                  .querySelector(`#row-${order._id}`)
                  .nextElementSibling.classList.toggle("w3-hide");
                console.log("clicked");
              }}
            >
              <td>{order._id}</td>
              <td>
                {Date(order.purchaseDate)
                  .toString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")}
              </td>
              <td>{order.cart.length}</td>
            </tr>
            <OrderListSub order={order} />
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;