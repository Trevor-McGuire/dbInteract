import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList/ProductList";
import { READ_PRODUCTS } from "../utils/queries";

const Category = () => {
  const { categoryName } = useParams();
  const { data, loading, error } = useQuery(READ_PRODUCTS, { variables: { category: categoryName } });
  const products = data?.readProducts || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (products.length === 0) return <p>No products found</p>;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Category;
