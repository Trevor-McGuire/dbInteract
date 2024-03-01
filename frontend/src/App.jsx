import React, { StrictMode, useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import { Box } from "@mui/material";
import client from "./apollo"; // Import your Apollo Client setup

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <StrictMode>
        <ScrollToTop />
        <Header isAuthenticated={isAuthenticated} />
        <Box component="main" sx={{ minHeight: "calc(100vh - 64px)" }}>
          <Outlet />
        </Box>
        <Footer />
      </StrictMode>
    </ApolloProvider>
  );
}

export default App;