import React from "react";
import '../style/productList.sass'
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  const baseUrl = window.location.origin;

  return (
    <div id="product-list-component">
      {products && (
        <div className="product-list-header">
          <p>{products.length} Item{products.length !== 1 ? "s" : ""}</p>
        </div>
      )}
      <div className="product-list-grid">
        {products &&
          products.map((product) => (
            <Link 
            to={`/product/${product._id}`}
            className="product-item" key={product._id}>
              <div className="product-image">
                <img
                  src={`${baseUrl}/${product.images[0].url}`}
                  className="product-image"
                />
              </div>
              <div className="product-details">
                <p className="product-title">{product.title}</p>
                <p className="product-price">${product.price}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
