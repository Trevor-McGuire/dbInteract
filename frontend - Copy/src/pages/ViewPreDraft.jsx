import React, { useState } from "react";
import { Link } from "react-router-dom";

const productsImport = [
  {
    id: 1,
    title: "Product 1",
    quantity: 3,
    photo: "photo",
    location: null,
    category: null,
    requiredFeatures: null,
  },
  {
    id: 2,
    title: "Product 2",
    quantity: 5,
    photo: "photo",
    location: "nw5",
    category: null,
    requiredFeatures: null,
  },
  {
    id: 3,
    title: "Product 3",
    quantity: 7,
    photo: "photo",
    location: "nw5",
    category: "watch",
    requiredFeatures: null,
  },
  {
    id: 4,
    title: "Product 4",
    quantity: 7,
    photo: "photo",
    location: "nw5",
    category: "watch",
    requiredFeatures: "complete",
  },
];

const ViewPreDraft = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState(productsImport);

  const handleRowClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handlePushToDraft = (productId) => {
    const newProducts = products.filter((product) => product.id !== productId);
    setProducts(newProducts);
  };

  return (
    <>
      <h1>View Pre Drafts</h1>
      <table
        style={{
          textAlign: "center",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Photo</th>
            <th>Location</th>
            <th>Category</th>
            <th>Required Features</th>
            <th>Push to Draft</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={selectedProductId === product.id ? "selected-row" : ""}
              onClick={() => handleRowClick(product.id)}
            >
              <input type="text" value={product.title} />
              
              <td>{product.quantity}</td>
              <td>{product.photo}</td>
              <td>{product.location}</td>
              <td>{product.category}</td>
              <td>{product.requiredFeatures}</td>
              <td>
                <button onClick={() => handlePushToDraft(product.id)}>
                  {product.location === null
                    ? "Add Location"
                    : product.category === null
                      ? "Add Category"
                      : product.requiredFeatures === null
                        ? "Add Required Features"
                        : "Push to Draft"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProductId && (
        <Link to={`/view-pre-draft/${selectedProductId}`}>
          Go to Product Details
        </Link>
      )}
    </>
  );
};

export default ViewPreDraft;
