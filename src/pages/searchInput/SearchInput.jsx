import React, { useEffect, useRef } from "react";

const SearchInput = ({ isOpen, className ,onChange, showCross, placeholder }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <input 
      type={showCross ? "search" : "text"}
      className={className}
      placeholder={placeholder}
      ref={inputRef}
      onChange={onChange}
    />
  );
};

export default SearchInput;
