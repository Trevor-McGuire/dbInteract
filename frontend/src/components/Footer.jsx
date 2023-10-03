import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <footer
      className="w3-padding-64 w3-light-grey w3-small w3-center"
      id="footer"
    >
      <div className="">
        <h4>About</h4>
        <p>
          <Link to={"/about"} href="#">
            About us
          </Link>
        </p>
        <i className="fa fa-facebook-official w3-hover-opacity w3-large"></i>
        <i className="fa fa-instagram w3-hover-opacity w3-large"></i>
        <i className="fa fa-snapchat w3-hover-opacity w3-large"></i>
        <i className="fa fa-pinterest-p w3-hover-opacity w3-large"></i>
        <i className="fa fa-twitter w3-hover-opacity w3-large"></i>
        <i className="fa fa-linkedin w3-hover-opacity w3-large"></i>
      </div>
    </footer>
  );
};

export default footer;
