import React from "react";
import { useQuery } from "@apollo/client";

import ProductList from "../components/ProductList/ProductList";
import HeaderImage from "../components/HeaderImage";
import { READ_PRODUCTS } from "../utils/queries";

const Home = () => {
  const { data, loading, error } = useQuery(READ_PRODUCTS);
  const products = data?.readProducts || [];

  return (
    <>
      <HeaderImage />
      <ProductList products={products} />
    </>
  );
};

export default Home;
