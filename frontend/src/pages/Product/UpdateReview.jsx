import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_REVIEW } from "../../utils/mutations";
import { READ_PRODUCTS } from "../../utils/queries";
import { DELETE_REVIEW } from "../../utils/mutations";
import { READ_USER_REVIEW } from "../../utils/queries";



const UpdateReview = ({setHasExistingReview,productId}) => {
  const { data: readUserReviewData } = useQuery(READ_USER_REVIEW, {
    variables: { productId },
  });
  useEffect(() => {
    if (readUserReviewData) {
      const data = readUserReviewData.readUserReview;
      setFormState({
        reviewId: data._id,
        title: data.title,
        body: data.body,
        rating: parseInt(data.rating),
      });
    }
  }, [readUserReviewData]);
  
  const [formState, setFormState] = useState({
    reviewId: "",
    title: "",
    body: "",
    rating: 0,
  });

  const [updateReview] = useMutation(UPDATE_REVIEW);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateReview({
        variables: { input: formState },
        refetchQueries: [
          { query: READ_PRODUCTS, variables: { id: productId } },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === "rating" ? parseInt(value, 10) : value,
    });
  };

  const handleDelete = async (e) => {
    try {
      const response = await deleteReview({
        variables: {
          reviewId: formState.reviewId,
        },
        refetchQueries: [
          { query: READ_PRODUCTS, variables: { id: review.productId } },
        ],
      });
      onReviewSubmit(false);
    } catch (error) {
      console.error(error);
    }
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
        className="w3-input w3-border-0 w3-auto"
        style={{ resize: "none" }}
        onChange={handleChange}
        rows={4}
      />
      <select
        name="rating"
        value={formState.rating}
        className="w3-input w3-border-0"
        onChange={handleChange}
      >
        <option value={0}>0 Stars</option>
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
      <button className="w3-button w3-blue w3-margin-top" type="submit">
        Update
      </button>
      <button
        className="w3-button w3-red w3-margin-top w3-right"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </form>
  );
};

export default UpdateReview;
