import React, { useEffect, useRef } from "react";
import EbaySocial from "../components/ebay";
import { useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { EXCHANGE_AUTHORIZATION_CODE } from "../utils/mutation";

const EbayAuth = () => {
  const { search } = useLocation();
  const authorizationCode = new URLSearchParams(search).get("code");
  const hasRun = useRef(false);

  const [exchangeAuthorizationCode, { loading, error, data }] = useMutation(
    EXCHANGE_AUTHORIZATION_CODE
  );

  useEffect(() => {
    if (authorizationCode && !hasRun.current) {
      hasRun.current = true;
      exchangeAuthorizationCode({ variables: { code: authorizationCode } });
    }
  }, [authorizationCode, exchangeAuthorizationCode]);

  return (
    <>
      <h1>EbayAuth</h1>
      <EbaySocial />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <p>
          Authorization code exchanged for access token and refresh token
        </p>
      )}
    </>
  );
};

export default EbayAuth;
