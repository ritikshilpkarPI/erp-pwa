import React, { useEffect, useRef } from "react";
import trimInvalidSpaces from "../../utils/trimInvalidSpaces";

const SearchInput = ({ isOpen, className ,onChange}) => {
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
      ref={inputRef}
      onChange={(e) => {
        const validValue = trimInvalidSpaces(e.target.value);
        console.log({ validValue })
        e.target.value = validValue;
        onChange(e);
      }}
    />
  );
};

export default SearchInput;
