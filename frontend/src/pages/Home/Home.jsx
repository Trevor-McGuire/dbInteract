import React, { useEffect } from "react";
import EbaySocial from "../../components/OauthLogIn/ebay";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const EXCHANGE_AUTHORIZATION_CODE = gql`
  mutation ExchangeAuthorizationCode($code: String!) {
    exchangeAuthorizationCode(code: $code) {
      access_token
    }
  }
`;

const Home = () => {

  // wait for param code in url and make a request to the backend to exchange it for an access token
  const [exchangeAuthorizationCode] = useMutation(EXCHANGE_AUTHORIZATION_CODE);
  useEffect(() => {
    const handleAuthorizationCode = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
      if (authorizationCode) {
        try {
          const { data } = await exchangeAuthorizationCode({
            variables: { code: authorizationCode },
          });
          const accessToken = data.exchangeAuthorizationCode.access_token;
          localStorage.setItem("access_token", accessToken);
        } catch (error) {
          console.error(
            "Error exchanging authorization code for access token",
            error
          );
        }
      }
    };
    handleAuthorizationCode();
  }, [exchangeAuthorizationCode]);

  return (
    <>
      <h1>Home</h1>
      <EbaySocial />
    </>
  );
};

export default Home;
