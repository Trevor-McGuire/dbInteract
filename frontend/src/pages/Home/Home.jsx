import React from "react";
import { useQuery } from "@apollo/client";
import ProductList from "../../components/ProductList/ProductList";
import HeaderImage from "./HeaderImage";
import { READ_PRODUCTS } from "../../utils/queries";

const Home = () => {
  const { data } = useQuery(READ_PRODUCTS);
  const home = data?.readProducts || null;

  return (
    <>
      <HeaderImage />
      <ProductList products={home} />
    </>
  );
};

export default Home;
