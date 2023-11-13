import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { READ_PRODUCTS } from "../../../utils/queries";
import { useParams } from "react-router-dom";
import { gql } from "@apollo/client";

const ADD_REVIEW = gql`
  mutation AddReview($input: AddReviewInput!) {
    addReview(input: $input) {
      _id
    }
  }
`;

const AddReview = ({setHasExistingReview}) => {
  const productId = useParams().productId;
  const [formState, setFormState] = useState({
    product: productId,
    title: "",
    body: "",
    rating: 1,
  });
  const [addReview] = useMutation(ADD_REVIEW);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview({
        variables: { input: formState },
        refetchQueries: [
          { query: READ_PRODUCTS, variables: { id: productId } },
        ],
      });
      setHasExistingReview(true);
    } catch (error) {
      console.error(error);
    }
  };

  // set up the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === "rating" ? parseInt(value, 10) : value,
    });
  };

  return (
    <form
      className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin w3-padding"
      id="review-form"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={formState.title}
        className="w3-input w3-border-0"
        onChange={handleChange}
      />
      <textarea
        placeholder="Review"
        name="body"
        value={formState.body}
        className="w3-input w3-border-0"
        onChange={handleChange}
      />
      <select
        name="rating"
        value={formState.rating}
        className="w3-input w3-border-0"
        onChange={handleChange}
      >
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
      <button className="w3-button w3-blue w3-margin-top">Submit</button>
    </form>
  );
};

export default AddReview;
