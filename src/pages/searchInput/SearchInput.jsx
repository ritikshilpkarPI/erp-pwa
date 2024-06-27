import React, { useEffect, useRef } from "react";

const SearchInput = ({ isOpen, className }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <input 
      type="search"
      className={className}
      placeholder='Search items..'
      ref={inputRef} // Assign ref to the input element
    />
  );
};

export default SearchInput;
