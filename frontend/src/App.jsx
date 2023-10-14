import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StrictMode } from "react";
import { Outlet } from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import Sidebar from "./components/sidebar.jsx";
import Overlay from "./components/overlay.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header";

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
  return (
    <ApolloProvider client={client}>
      <StrictMode>
        <Header />
        <Outlet />
        <Overlay />
        <Footer />
      </StrictMode>
    </ApolloProvider>
  );
}

export default App;