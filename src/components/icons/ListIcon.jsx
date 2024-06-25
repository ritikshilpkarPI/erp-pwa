import React from "react";

const ListIcon = ({className}) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        className={className}
        viewBox="0 0 24 24"
      >
        <path
          stroke="#2A3256"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M22 6.5H9M22 12H9M22 17.5H9"
        ></path>
        <circle cx="4" cy="6.5" r="1" stroke="#2A3256" strokeWidth="2"></circle>
        <circle cx="4" cy="12" r="1" stroke="#2A3256" strokeWidth="2"></circle>
        <circle
          cx="4"
          cy="17.5"
          r="1"
          stroke="#2A3256"
          strokeWidth="2"
        ></circle>
      </svg>
  );
};

export default ListIcon;
