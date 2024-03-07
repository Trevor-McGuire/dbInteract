import React from "react";
import { useQuery } from "@apollo/client";
import { READ_PRODUCTS } from "../utils/query";
import CreateProducts from "../components/CreateProducts";
import DeleteProduct from "../components/DeleteProduct";
import UpdateProduct from "../components/UpdateProduct";
import { useState } from "react";

const Products = () => {
  const { loading, error, data, refetch } = useQuery(READ_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Products</h1>
      <CreateProducts refetch={refetch} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.readProducts.map((product) => (
            <tr key={product.id}>
              <td>
                {" "}
                <div
                  style={{
                    width: "100px",
                    height: "50px",
                    background: `url(${"https://res.cloudinary.com/dpcmouapx/image/upload/v1708380487/samples/cloudinary-icon.png"}) center center / contain no-repeat`,
                  }}
                ></div>
              </td>
              {editingProduct?._id === product._id ? (
                <>
                  <UpdateProduct
                    product={product}
                    refetch={refetch}
                    setEditingProduct={setEditingProduct}
                  />
                </>
              ) : (
                <>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <DeleteProduct id={product._id} refetch={refetch} />
                  </td>
                  <td>
                    <button onClick={() => setEditingProduct(product)}>
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Products;
