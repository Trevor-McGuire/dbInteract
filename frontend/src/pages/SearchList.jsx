import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ProductList from "../components/ProductList/ProductList";
import { READ_PRODUCTS } from "../utils/queries";
import "../style/search.sass";
import { Typography } from "@mui/material";

const SearchList = () => {
  const { searchText } = useParams();
  const { data, loading, error } = useQuery(READ_PRODUCTS, {
    variables: { search: searchText },
  });
  const products = data?.readProducts || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (products.length === 0) return <p>No products found</p>;

  return (
    <div>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        Search results for {searchText}
      </Typography>
      <ProductList products={products} />
    </div>
  );
};

export default SearchList;
