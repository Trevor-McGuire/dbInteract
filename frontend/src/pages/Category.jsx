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
        badges {
          inStock
        }
      }
    }
  }
`;

const Category = () => {
  const { categoryName } = useParams();
  const { data } = useQuery(GET_CATEGORY, {
    variables: { identifier: categoryName },
  });
  const category = data?.getCategory.products || null;

  return (
    <>
      <ProductList products={category} />
    </>
  );
};

export default Category;
