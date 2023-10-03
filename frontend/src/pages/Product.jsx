import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import "../style/Product.sass";
import ProductImageCarousel from "../components/ProductImageCarousel";

const READ_PRODUCT = gql`
  query Query($id: ID!) {
    readProduct(_id: $id) {
      _id
      title
      quantity
      price
      description
      images {
        _id
        altText
        url
      }
      ratings {
        _id
        body
        rating
        title
        user {
          _id
          username
        }
      }
    }
  }
`;

const Product = () => {
  const baseUrl = window.location.origin;
  const { productId } = useParams();
  const [quantity, setQuantity] = React.useState(1);

  const { data, loading, error } = useQuery(READ_PRODUCT, {
    variables: { id: productId },
  });
  const product = data?.readProduct || {};

  const handleAddToCart = () => {
    console.log("Add to cart clicked", product._id, quantity);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (product.length === 0) return <p>No product found</p>;

  return (
    <div id="product-component">
      <div className="product-image">
        <ProductImageCarousel images={product.images} />
      </div>
      <div className="product-details">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-quantity">In stock: {product.quantity}</p>
        <input
          max={product.quantity}
          min={1}
          defaultValue={1}
          type="number"
          className="product-quantity-input"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="button" onClick={handleAddToCart} className="add-to-cart">
          Add to Cart
        </button>
      </div>
      <div className="product-reviews">
        <h3>Customer Reviews:</h3>
        <ul>
          {product.ratings.map((rating, index) => (
            <li key={index}>
              <strong>{rating.title}</strong>
              <p>{rating.body}</p>
              <p>Rating: {rating.rating}</p>
              <p>By: {rating.user.username}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
