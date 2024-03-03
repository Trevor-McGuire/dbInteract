import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        gap: "1rem",
        backgroundColor: "lightgray",
        padding: "1rem"
      }}
    >
      <h1>DB-Interact</h1>
      <Link to="/">Home</Link>
      <Link to="/user">User</Link>
      <Link to="/users">Users</Link>
    </div>
  );
};

export default Header;
