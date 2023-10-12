import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StrictMode } from "react";
import { Outlet } from "react-router-dom";

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
          <Sidebar />
          <Overlay />
          <div className="w3-main" style={{ marginLeft: "250px" }}>
            <Header />
            <Outlet />
            <Footer />
          </div>
      </StrictMode>
    </ApolloProvider>
  );
}

export default App;