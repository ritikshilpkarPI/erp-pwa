import React from "react";
import "./MainNav.css";
import MainHeaderMenu from "./MainHeaderMenu";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import HamburgerIcon from "../../image/HamburgerIcon.svg";
import { useAppContext } from "../../appState/appStateContext";


const MainNav = () => {
  const {  dispatch } = useAppContext();
  const handleHamburger = () =>{
    dispatch({ type: 'TOGGLE_DRAWER' });
  }
  return (
    <div className="main-nav-bar">
       <NavigationHeader
        title="Items"
        titleClassName="navigation-header-Items"
        NavigationHeaderImage={HamburgerIcon}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={handleHamburger}
      />
      <MainHeaderMenu />
    </div>
  );
};

export default MainNav;
