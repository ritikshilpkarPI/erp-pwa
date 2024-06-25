import React from "react";
import "./MainNav.css";
import SearchIcon from "../icons/SearchIcon";
import BarCodeIcon from "../icons/BarCodeIcon";
import ListIcon from "../icons/ListIcon";

const MainHeaderMenu = () => {
  return (
    <div className="main-header-menu">
      <select className="main-heaer-menu-select">
        <option value="one" disabled selected>
          All products
        </option>
        <option value="one">one</option>
        <option value="one">one</option>
        <option value="one">one</option>
      </select>
      <SearchIcon />
      <BarCodeIcon />
      <ListIcon />
    </div>
  );
};

export default MainHeaderMenu;
