import React from "react";
import { useAppContext } from "../appState/appStateContext";
;
const HamburgerMenu = () => {
  const {  dispatch } = useAppContext();
  const handleHamburger = () =>{
    dispatch({ type: 'TOGGLE_DRAWER' });
  }
  return (
   <span onClick={handleHamburger}>
     <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="14"
      fill="none"
      viewBox="0 0 18 14"
  
    >
      <rect width="18" height="2" fill="#1A72DD" rx="1"></rect>
      <rect width="12.96" height="2" y="6" fill="#1A72DD" rx="1"></rect>
      <rect width="18" height="2" y="12" fill="#1A72DD" rx="1"></rect>
    </svg>
   </span>
  );
};

export default HamburgerMenu;
