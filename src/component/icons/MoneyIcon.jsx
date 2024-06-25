import React from "react";

const MoneyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="lucide lucide-banknote"
      viewBox="0 0 24 24"
    >
      <rect width="20" height="12" x="2" y="6" rx="2"></rect>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M6 12h.01M18 12h.01"></path>
    </svg>
  );
};

export default MoneyIcon;
