import React from "react";
import { useQuery } from "@apollo/client";
import { READ_CART } from "../utils/queries";
import RemoveFromCart from "../components/RemoveFromCart";
import Checkout from "../components/Checkout";
import { Link } from "react-router-dom";
import "../style/CartList.sass"

const CartList = () => {
  const baseUrl = window.location.origin;

  const { data, error, loading } = useQuery(READ_CART);
  const cart = data?.readUser?.cart;
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;
  if (!cart || !cart.length) return <h2>Empty Cart</h2>;
  return (
    <>
      <table id="cart-list-component" className="w3-table-all w3-centered">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.map((item) => (
              <tr key={item._id}>
                <td className="w3-hover-opacity w3-hover-outline">
                  <Link to={`/product/${item.product._id}`}>
                    <img
                      height="100px"
                      src={`${baseUrl}/${item.product.images[0].url}`}
                      alt={item.product.images.altText}
                    />
                  </Link>
                </td>
                <td>
                  <Link to={`/product/${item.product._id}`}>
                    {item.product.title}
                  </Link>
                </td>
                <td>
                  {item.quantity}
                </td>
                <td>{item.product.price}</td>
                <td>
                  <RemoveFromCart id={item._id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Checkout />
    </>
  );
};

export default CartList;
