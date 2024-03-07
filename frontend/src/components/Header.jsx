import React from "react";
import { Link } from "react-router-dom";

const Protected = (route) => {
  return (
    <Link to={route} style={{ textDecoration: "none", color: "blue" }}>
      {route}
    </Link>
  );
};

const Unprotected = (route) => {
  return (
    <Link to={route} style={{ textDecoration: "none", color: "red" }}>
      {route}
    </Link>
  );
};

const Action = (route) => {
  return (
    <Link to={route} style={{ textDecoration: "none", color: "green" }}>
      {route}
    </Link>
  );
};



const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        gap: "1rem",
        backgroundColor: "lightgray",
        padding: "1rem",
      }}
    >
      <h1>DB-Interact</h1>
      {Unprotected("/")}
      {Protected("/User")}
      {Unprotected("/Users")}
      {Unprotected("/auth")}
      {Protected("/ebay-auth")}
      {Protected("/products")}
      {Protected("/locations")}
    </div>
  );
};

export default Header;
