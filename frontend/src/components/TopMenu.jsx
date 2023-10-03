import React from "react";

const TopMenu = () => {
  const handleMenuClick = () => {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  };

  return (
    <header className="w3-bar w3-top w3-hide-large w3-black w3-xlarge">
      <div className="w3-bar-item w3-padding-24 w3-wide">LOGO</div>
      <span
        className="w3-bar-item w3-button w3-padding-24 w3-right"
        onClick={handleMenuClick}
      >
        <i className="fa fa-bars"></i>
      </span>
    </header>
  );
};

export default TopMenu;
