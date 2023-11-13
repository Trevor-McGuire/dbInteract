import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StrictMode, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import { Box } from "@mui/material";

const httpLink = createHttpLink({
  uri: "/graphql", // Adjust the URI to match your server endpoint
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("auth_token");

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true, // Enable Devtools
});

function App() {
  const [boxHeight, setBoxHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setBoxHeight(
        window.innerHeight -
          document.querySelector("header").offsetHeight -
          document.querySelector("footer").offsetHeight - 
          64
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ApolloProvider client={client}>
      <StrictMode>
        <ScrollToTop />
        <Header />
        <Box sx={{
          minHeight: boxHeight,
          margin: "32px auto",
          padding: "1rem",
          paddingRight: "2rem",
          width: "100vw" 
        }}>
          <Outlet />
        </Box>
        <Footer />
      </StrictMode>
    </ApolloProvider>
  );
}

export default App;
