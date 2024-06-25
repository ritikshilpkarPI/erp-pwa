import React from "react";
import "./MainNav.css";
import HamburgerMenu from "../icons/HamburgerMenu";

const MainHeader = ({apptitle}) => {
  return (
    <div className="main-header">
      <HamburgerMenu />
      <h1 className="main-header-h1">{apptitle} </h1>
    </div>
  );
};

export default MainHeader;
