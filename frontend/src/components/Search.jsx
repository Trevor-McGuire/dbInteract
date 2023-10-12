import React, { useState, useRef } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchText ? (window.location.href = `/search/${searchText}`) : "";
  };

  return (
    <form onSubmit={handleSubmit} id="search-component">
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
  );
};

export default Search;
