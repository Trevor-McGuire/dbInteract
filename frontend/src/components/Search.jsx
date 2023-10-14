import React, { useState, useRef } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchText ? (window.location.href = `/search/${searchText}`) : "";
  };

  return (
    <form onSubmit={handleSearchSubmit} id="search-component">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchInputChange}
        ref={searchInputRef}
      />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
};

export default Search;
