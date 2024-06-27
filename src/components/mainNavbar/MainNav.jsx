import React from "react";
import "./MainNav.css";
import MainHeader from "./MainHeader";
import MainHeaderMenu from "./MainHeaderMenu";
const MainNav = () => {
  return (
    <div className="main-nav-bar">
      <MainHeader />
      <MainHeaderMenu />
    </div>
  );
};

export default MainNav;
