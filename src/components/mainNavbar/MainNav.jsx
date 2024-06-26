import React from "react";
import "./MainNav.css";
import MainHeader from "./MainHeader";
import MainHeaderMenu from "./MainHeaderMenu";
import NavigationHeader from "../navigationHeader/NavigationHeader";
const MainNav = () => {
  return (
    <div className="main-nav-bar">
     <NavigationHeader/>
      <MainHeaderMenu/>
    </div>
  );
};

export default MainNav;
