import React from "react";
import '../mainNavbar/MainNav.css'

const SearchIcon = () => {
  return (
    <div className="search-icon-outer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          stroke="#262F56"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M17 17l-4.904-4.904m0 0a6.5 6.5 0 10-9.192-9.192 6.5 6.5 0 009.192 9.192z"
        ></path>
      </svg>
    </div>
  );
};

export default SearchIcon;
