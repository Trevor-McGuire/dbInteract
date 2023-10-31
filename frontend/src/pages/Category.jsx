import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList/ProductList";
import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`

  query GetCategory($identifier: String!) {
    getCategory(identifier: $identifier) {
      _id
      depth
      identifier
      name
      products {
        _id
        title
        price
        image
        ratingStats {
          averageStars
          stars
          totalReviews
        }
      }
    }
  }
`;

const Category = () => {
  const { categoryName } = useParams();
  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { identifier: categoryName },
  });
  const category = data?.getCategory || [];

  return (
    <>
      <ProductList products={category.products} />
    </>
  );
};

export default Category;
