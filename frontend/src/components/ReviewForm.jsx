import React, { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { HAS_PRODUCT_IN_ORDERS, HAS_EXISTING_REVIEW } from "../utils/queries";
import { useParams } from "react-router-dom";
import UpdateReview from "./UpdateReview";
import AddReview from "./AddReview";

const ReviewForm = () => {
  const [loggedIn] = useState(Auth.loggedIn());
  const [productId] = useState(useParams().productId);
  const [hasProductInOrders, setHasProductInOrders] = useState(false);
  const [hasExistingReview, setHasExistingReview] = useState(false);

  const { data: hasProductInOrdersData } = useQuery(HAS_PRODUCT_IN_ORDERS, {
    variables: { productId },
  });

  const { data: hasExistingReviewData } = useQuery(HAS_EXISTING_REVIEW, {
    variables: { productId },
  });

  useEffect(() => {
    setHasProductInOrders(hasProductInOrdersData?.hasProductInOrders);
  }, [hasProductInOrdersData]);
  useEffect(() => {
    setHasExistingReview(hasExistingReviewData?.hasExistingReview);
  }, [hasExistingReviewData]);

  if (!loggedIn) return <p>Please log in to leave a review</p>;

  if (!hasProductInOrders)
    return <p>You must purchase this product to leave a review</p>;

  if (hasExistingReview)
    return (
      <UpdateReview
        setHasExistingReview={setHasExistingReview}
        productId={productId}
      />
    );
  else return <AddReview setHasExistingReview />;
};

export default ReviewForm;
