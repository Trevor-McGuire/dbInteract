import React, { useEffect, useState } from "react";
import Auth from "../../../utils/auth";
import { useQuery } from "@apollo/client";
import { HAS_PRODUCT_IN_ORDERS, HAS_EXISTING_REVIEW } from "../../../utils/queries";
import { useParams } from "react-router-dom";
import UpdateReview from "../UpdateReview";
import AddReview from "../AddReview";
import { gql } from "@apollo/client";

const ReviewForm = () => {
  const [loggedIn] = useState(Auth.loggedIn());
  const [productId] = useState(useParams().productId);
  const [hasProductInOrders, setHasProductInOrders] = useState(false);
  const [hasExistingReview, setHasExistingReview] = useState(false);

  const { data: hasProductInOrdersData, data: hasExistingReviewData } = useQuery(
    gql`
      query ($productId: ID!) {
        hasProductInOrders(productId: $productId)
        hasExistingReview(productId: $productId)
      }
    `,
    {
      variables: { productId },
    }
  );
  
  useEffect(() => {
    setHasProductInOrders(hasProductInOrdersData?.hasProductInOrders);
    setHasExistingReview(hasExistingReviewData?.hasExistingReview);
  }, [hasProductInOrdersData, hasExistingReviewData]);

  return (
    <>
      {!loggedIn && <p>Please log in to leave a review</p>}
      {loggedIn && !hasProductInOrders && <p>You must purchase this product to leave a review</p>}
      {loggedIn && hasExistingReview && (
        <UpdateReview setHasExistingReview={setHasExistingReview} productId={productId} />
      )}
      {loggedIn && !hasExistingReview && <AddReview setHasExistingReview />}
    </>
  );
};

export default ReviewForm;
