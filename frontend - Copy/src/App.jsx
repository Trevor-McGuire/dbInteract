import React, { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import client from "./apollo"; 
import Header from "./components/Header";

function App() {
  return (
    <MantineProvider>
      <ApolloProvider client={client}>
        <StrictMode>
          <Header />
          <Outlet />
        </StrictMode>
      </ApolloProvider>
    </MantineProvider>
  );
}

export default App;
