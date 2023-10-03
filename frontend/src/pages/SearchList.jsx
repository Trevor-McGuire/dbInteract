import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ProductList from "../components/ProductList";

const PRODUCT_SEARCH_QUERY = gql`
  query Query($query: String!) {
    searchProducts(query: $query) {
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

const SearchList = () => {
  const { searchText } = useParams();

  const { data, loading, error } = useQuery(PRODUCT_SEARCH_QUERY, {
    variables: { query: searchText },
    skip: !searchText, // Skip the query if searchText is empty
  });

  const products = data?.searchProducts || [];

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default SearchList;
