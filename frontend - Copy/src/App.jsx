import React, { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import client from "./apollo";
import Header from "./components/Header";

function App() {
  return (
    <ApolloProvider client={client}>
      <StrictMode>
          <Header />
          <Outlet />
      </StrictMode>
    </ApolloProvider>
  );
}

export default App;
