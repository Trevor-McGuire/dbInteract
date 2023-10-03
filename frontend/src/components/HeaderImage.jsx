import React from "react";
import { Link } from "react-router-dom";

function getCurrentSeason() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns a zero-based index
  let season = "";
  switch (true) {
    case currentMonth >= 3 && currentMonth <= 5:
      season = "Spring";
      break;
    case currentMonth >= 6 && currentMonth <= 8:
      season = "Summer";
      break;
    case currentMonth >= 9 && currentMonth <= 11:
      season = "Fall";
      break;
    default:
      season = "Winter";
  }
  const currentYear = currentDate.getFullYear();
  return `${season} ${currentYear}`;
}

const HeaderImage = () => {
  const baseUrl = window.location.origin;

  const seasonAndYear = getCurrentSeason();
  return (
    <div className="w3-display-container w3-container">
      <img
        src={`${baseUrl}/images/categories/electronics1.png`}
        alt="Jeans"
        style={{ width: "100%" }}
      />
      <div
        className="w3-display-topleft w3-text-white"
        style={{ padding: "24px 48px",}}
      >
        <h1 className="w3-jumbo w3-hide-small">New arrivals</h1>
        <h1 className="w3-hide-large w3-hide-medium">New arrivals</h1>
        <h1 className="w3-hide-small">{seasonAndYear} Collection</h1>
        <p>
          <Link
            to={"/category/Electronics"}
            href="#jeans"
            className="w3-button w3-black w3-padding-large w3-large"
          >
            SHOP ELECTRONICS
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HeaderImage;
