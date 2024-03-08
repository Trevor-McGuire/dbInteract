import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../utils/mutation";
import { READ_LOCATIONS } from "../utils/query";
import { useQuery } from "@apollo/client";

const CreateProducts = ({ refetch }) => {
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const { loading, error, data } = useQuery(READ_LOCATIONS);

  const [formState, setFormState] = React.useState({
    title: `Product${new Date().getTime()}`,
    price: Math.floor(Math.random() * 100),
    description: "Description",
    locationId: "",
    quantity: 0,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreateProduct = async (e) => {
    console.log("formState:", formState);
    e.preventDefault();
    try {
      await createProduct({
        variables: {
          ...formState,
          location: [
            { locationId: formState.locationId, quantity: formState.quantity },
          ],
        },
      });
      refetch();
    } catch (createError) {
      console.error("Create failed:", createError.message);
    }
  };

  return (
    <>
      <h2>Create Product</h2>
      <form
        onSubmit={(e) => {
          handleCreateProduct(e);
        }}
      >
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={(e) =>
              setFormState({ ...formState, price: parseFloat(e.target.value) })
            }
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
          />
        </label>
        <label>
          Location:
          <select
            name="location"
            value={formState.locationId}
            onChange={(e) =>
              setFormState({
                ...formState,
                locationId: e.target.value,
              })
            }
          >
            {data.readLocations.map((location, index) => (
              <option key={index} value={location._id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formState.quantity}
            onChange={(e) =>
              setFormState({
                ...formState,
                quantity: parseInt(e.target.value),
              })
            }
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default CreateProducts;
