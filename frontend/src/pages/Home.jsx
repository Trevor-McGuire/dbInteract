import React from "react";
import { useQuery, gql } from "@apollo/client";

import ProductList from "../components/ProductList";
import HeaderImage from "../components/HeaderImage";

export const READ_PRODUCTS_QUERY = gql`
  query ReadProducts {
    readProducts {
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

const Home = () => {
  const { data, loading, error } = useQuery(READ_PRODUCTS_QUERY);
  const products = data?.readProducts || [];

  return (
    <>
      <HeaderImage />
      <ProductList products={products} />
    </>
  );
};

export default Home;
