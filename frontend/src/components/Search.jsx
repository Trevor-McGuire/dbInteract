import React, { useState, useRef } from "react";
import "../style/Search.sass";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchText ? window.location.href = `/search/${searchText}` : "";
  };

  return (
    <div id="search-component" className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
          ref={searchInputRef}
        />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
