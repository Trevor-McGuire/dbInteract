import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../style/Product.sass";
import ProductImageCarousel from "../components/ProductImageCarousel";
import AddToCart from "../components/AddToCart";
import { READ_PRODUCTS } from "../utils/queries";
import ReviewForm from "../components/ReviewForm";


const Product = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = React.useState(1);

  const { data, loading, error } = useQuery(READ_PRODUCTS, { variables: { id: productId } });
  const product = data?.readProducts[0] || {};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
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
        <AddToCart productId={product._id} quantity={quantity} />
      </div>
      <div className="product-reviews">
        <h3>Customer Reviews:</h3>
        <ul>
        <ReviewForm />
          {product.ratings.map((rating, index) => (
            <li key={index}>
              <strong>{rating.title}</strong>
              <p>{rating.body}</p>
              <p>Rating: {
                [...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fa fa-star${i < rating.rating ? '' : '-o'}`}
                  ></i>
                ))
                }</p>
              <p>By: {rating.user.username}</p>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default Product;
