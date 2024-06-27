import React from "react";

const AddIcon = ({onClick}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
      onClick={onClick}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M8.623 1.676V8.5m0 6.825V8.5m0 0h7.218m-7.218 0H1.405"
      ></path>
    </svg>
  );
};

export default AddIcon;
