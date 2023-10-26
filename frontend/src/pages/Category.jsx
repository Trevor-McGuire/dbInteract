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
      stars
      price
      images {
        url
      }
      averageStars
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

  console.log("category", category);


  return (
    <>
      <ProductList products={category.products} />
    </>
  );
};

export default Category;
