import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useAppState } from "../AppStateContext";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Auth from '../utils/auth';

export const QUERY_ME = gql`
  query Query {
    me {
      _id,
      username
    }
  }
`;

const Header = () => {
  const { data, loading, error } = useQuery(QUERY_ME);
  const user = data?.me || {};
  
  const handleSignOut = () => {
    Auth.logout();
  };


  return (
    <>
      <div className="w3-hide-large" style={{ marginTop: "83px" }}></div>

      <header className="w3-container w3-xlarge w3-black">
        <p className="w3-left">Jeans</p>
        <Search />
        <p className="w3-right">
          {user ? (
            <>
            <Link to="/profile">hello {user.username}</Link>
              <Link to="/" onClick={handleSignOut}>
                <button>Sign Out</button>
              </Link>
              
            </>
          ) : (
            <>
              
              <Link to="/login">Sign In</Link>
            </>
          )}
          <i className="fa fa-shopping-cart w3-margin-right"></i>
        </p>
      </header>
    </>
  );
};

export default Header;
