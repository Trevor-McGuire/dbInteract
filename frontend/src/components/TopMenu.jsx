import React from "react";
import { Link } from "react-router-dom";

const TopMenu = () => {
  const handleMenuClick = () => {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  };

  return (
    <>
      <div className="w3-hide-large" style={{ marginTop: "83px" }}></div>
      <div className="w3-bar w3-top w3-hide-large w3-black w3-xlarge">
        <Link
          to={"/"}
          className="w3-container w3-display-container w3-padding-16 w3-bar-item"
        >
          <h3 className="w3-wide w3-center">
            <b
              style={{
                fontSize: "30px",
                fontFamily: "fantasy",
                color: "yellow",
                textDecoration: "underline",
                backgroundColor: "black",
              }}
            >
              NexCommerce
            </b>
          </h3>
        </Link>
        <span
          className="w3-bar-item w3-button w3-padding-24 w3-right"
          onClick={handleMenuClick}
        >
          <i className="fa fa-bars"></i>
        </span>
      </div>
    </>
  );
};

export default TopMenu;
