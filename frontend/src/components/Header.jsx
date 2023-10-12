import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { READ_CART } from "../utils/queries";
import '../style/header.sass'
import TopMenu from "./TopMenu";

const Header = () => {
  let numberOfItems = 0;

  if (Auth.loggedIn()) {
    const { data, error, loading } = useQuery(READ_CART);
    if (loading) return <p>?</p>;
    if (error) {console.log(error); return <p>:\</p>;}
    numberOfItems = data?.readUser?.cart.length || 0;
  }
  

  return (
    <>
      <TopMenu />
      <header id="header-component">
        <Search />
        <p className="w3-right">
          {Auth.loggedIn() ? (
            <>
              <Link
                to="/cart"
                className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large"
              >
                <i className="fa fa-shopping-cart"></i>
                <span>{numberOfItems}</span>
              </Link>
              <Link to="/profile"className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large">
                <i className="fa fa-user"></i>
                <span>{Auth.getProfile().data.username}</span>
              </Link>
              <Link to="/"className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large" onClick={() => {Auth.logout()}}>
                <i className="fa fa-sign-out"></i>
              </Link>
            </>
          ) : (
            <>
              <Link to="login"className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large">
                <i className="fa fa-sign-in"></i>
              </Link>
              <Link to="register"className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large">
                <i className="fa fa-user-plus"></i>
              </Link>
            </>
          )}
        </p>
      </header>
    </>
  );
};

export default Header;
