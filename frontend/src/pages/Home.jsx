import React, { useEffect } from "react";
import EbaySocial from "../components/ebay";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import RoutesList from "../components/RoutesList";

const EXCHANGE_AUTHORIZATION_CODE = gql`
  mutation ExchangeAuthorizationCode($code: String!) {
    exchangeAuthorizationCode(code: $code) {
      access_token
      expires_in
      refresh_token
      refresh_token_expires_in
      token_type
    }
  }
`;

const Home = () => {
  const { search } = useLocation();
  const authorizationCode = new URLSearchParams(search).get('code');

  const [exchangeAuthorizationCode, { data }] = useMutation(EXCHANGE_AUTHORIZATION_CODE);

  useEffect(() => {
    if (authorizationCode) {
      exchangeAuthorizationCode({ variables: { code: authorizationCode } });
    }
  }, [authorizationCode, exchangeAuthorizationCode]);

  return (
    <>
      <h1>Home</h1>
      <RoutesList />
      <EbaySocial />
    </>
  );
};

export default Home;