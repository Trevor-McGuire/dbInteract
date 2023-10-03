import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";


// Create a context to manage the application state
const AppStateContext = createContext();

// Define your GraphQL query here
const GET_USER_ID = gql`
  query GetUserId($token: String!) {
    userId(token: $token)
  }
`;

// Create the provider component
export function AppStateProvider({ children }) {
  // Define your initial state here
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Use Apollo Client's useQuery hook to fetch user ID
        const { data, loading, error } = useQuery(GET_USER_ID, {
          variables: {
            token: localStorage.getItem("token"),
          },
        });
  
        if (!loading && !error) {
          // Assuming your GraphQL query returns a user ID in the data
          setUserId(data.userId);
        } else {
          // Handle the case where the request fails or the token is invalid
          setUserId(null);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setUserId(null);
      }
    };
  
    if (isAuthenticated) {
      fetchUserId();
    }
  }, [isAuthenticated]);
      

  return (
    <AppStateContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

// Custom hook to easily access the application state
export function useAppState() {
  return useContext(AppStateContext);
}
