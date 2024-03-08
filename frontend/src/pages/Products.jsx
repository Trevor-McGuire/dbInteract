import React from "react";
import { useQuery } from "@apollo/client";
import { READ_PRODUCTS } from "../utils/query";
import CreateProducts from "../components/CreateProducts";
import DeleteProduct from "../components/DeleteProduct";
import UpdateProduct from "../components/UpdateProduct";
import { useState } from "react";
// import CreateProductLocation from "../components/CreateProductLocation";

const Products = () => {
  const { loading, error, data, refetch } = useQuery(READ_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Products</h1>
      <CreateProducts refetch={refetch} />
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Locations/quantities</th>
            <th>Delete</th>
            <th>Edit</th>
            {/* <th>Add Quantity</th> */}
          </tr>
        </thead>
        <tbody>
          {data.readProducts.map((product) => (
            <tr key={product._id}>
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
                    {product.location.reduce(
                      (acc, location) => acc + location.quantity,
                      0
                    )}
                  </td>
                  <td>
                    {product.location.map((location) => (
                      <div key={location._id}>
                        {location.name}: {location.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    <DeleteProduct id={product._id} refetch={refetch} />
                  </td>
                  <td>
                    <button onClick={() => setEditingProduct(product)}>
                      Edit
                    </button>
                  </td>
                  {/* <td>
                    <button onClick={() => setEditingLocation(product)}>
                      Add Quantity
                    </button>
                  </td> */}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <CreateProductLocation
        refetch={refetch}
        editingLocation={editingLocation}
        setEditingLocation={setEditingLocation}
      /> */}
    </>
  );
};

export default Products;
