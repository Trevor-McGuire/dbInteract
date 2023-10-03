import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import ProductList from "../components/ProductList";

const READ_PRODUCTS_BY_CATEGORY_QUERY = gql`
  query Query($category: String!) {
    readProductsByCategory(category: $category) {
      _id
      title
      price
      images {
        _id
        url
        altText
      }
    }
  }
`;

const GET_CATEGORY_BY_NAME_QUERY = gql`
  query Query($name: String!) {
    readCategoryByName(name: $name) {
      _id
      name
    }
  }
`;

const Category = () => {
  const { categoryName } = useParams();
  const { data: selectedCategory } = useQuery(GET_CATEGORY_BY_NAME_QUERY, {
    variables: { name: categoryName },
  });
  const categoryId = selectedCategory?.readCategoryByName?._id;

  const { data, loading, error } = useQuery(READ_PRODUCTS_BY_CATEGORY_QUERY, {
    variables: { category: categoryId },
  });
  const products = data?.readProductsByCategory || [];

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (products.length === 0) return <p>No products found</p>;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Category;
