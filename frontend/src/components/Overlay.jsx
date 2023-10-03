import React from "react";

const Overlay = () => {
  const handleCloseClick = () => {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  };

  return (
    <div
      className="w3-overlay w3-hide-large"
      onClick={handleCloseClick}
      style={{cursor:"pointer"}}
      title="close side menu"
      id="myOverlay"
    ></div>
  );
};

export default Overlay;
