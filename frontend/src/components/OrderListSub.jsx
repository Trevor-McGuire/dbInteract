import React from "react";
import { Link } from "react-router-dom";

const OrderListSub = ({ order }) => {
  const baseUrl = window.location.origin;

  return (
    <tr className='w3-hide'>
      <td colSpan="3"> {/* Span the columns to match the parent table */}
        <table className="w3-table-all w3-centered">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>

            </tr>
          </thead>
          <tbody>
            {order.cart &&
              order.cart.map((item) => (
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
                  <td>{item.quantity}</td>
                  <td>{item.product.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default OrderListSub;
