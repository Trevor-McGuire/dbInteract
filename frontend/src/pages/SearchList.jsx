import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ProductList from "../components/ProductList";
import { READ_PRODUCTS } from "../utils/queries";
import '../style/search.sass'

const SearchList = () => {
  const { searchText } = useParams();
  const { data, loading, error } = useQuery(READ_PRODUCTS, { variables: { search: searchText } });
  const products = data?.readProducts || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (products.length === 0) return <p>No products found</p>;

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default SearchList;
