import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    title: 'Product 1',
    quantity: 3,
    photo: 'photo',
    location: "ww4"
  },
  {
    id: 2,
    title: 'Product 2',
    quantity: 5,
    photo: 'photo',
    location: "ww5"
  },
  {
    id: 3,
    title: 'Product 3',
    quantity: 7,
    photo: 'photo',
    location: "ww6"
  }
]



const ViewPreDraft = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleRowClick = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <>
      <h1>View Pre Drafts</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Photo</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={selectedProductId === product.id ? 'selected-row' : ''}
              onClick={() => handleRowClick(product.id)}
            >
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              <td>{product.photo}</td>
              <td>{product.location}</td>
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
