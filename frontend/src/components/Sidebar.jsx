import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

export const READ_CATEGORIES_QUERY = gql`
  query {
    readCategories {
      _id
      name
    }
  }
`;

const Sidebar = () => {
  const handleCloseClick = () => {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  };

  const { data, loading, error } = useQuery(READ_CATEGORIES_QUERY);
  const categories = data?.readCategories || [];

  return (
    <nav
      className="w3-sidebar w3-bar-block w3-white w3-collapse w3-top"
      style={{ zIndex: 3, width: "250px" }}
      id="mySidebar"
    >
      <Link to={'/'} className="w3-container w3-display-container w3-padding-16">
        <i
          onClick={handleCloseClick}
          className="fa fa-remove w3-hide-large w3-button w3-display-topright"
        ></i>
        <h3 className="w3-wide">
          <b>NexCommerce</b>
        </h3>
      </Link>
      <div
        className="w3-padding-64 w3-large w3-text-grey"
        style={{ fontWeight: "bold" }}
      >
        {categories &&
          categories.map((category) => (
            <Link
              to={`/category/${category.name}`}
              key={category._id}
              className="w3-bar-item w3-button"
            >
              {category.name}
            </Link>
          ))}
      </div>
      <a href="#" className="w3-bar-item w3-button w3-padding">
        Contact
      </a>
      <a href="#" className="w3-bar-item w3-button w3-padding">
        Newsletter
      </a>
      <a href="#" className="w3-bar-item w3-button w3-padding">
        Subscribe
      </a>
    </nav>
  );
};

export default Sidebar;
