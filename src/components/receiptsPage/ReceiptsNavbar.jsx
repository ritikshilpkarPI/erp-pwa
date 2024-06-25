import React from "react";
import "./ReceiptsPage.css";
import HamburgerMenu from "../icons/HamburgerMenu";


const ReceiptsNavbar = () => {
  return (
    <nav className="categories-navbar">
      <div className="categories-navbar-menu">
        <HamburgerMenu/>
        <h3 className="categories-navbar-heading"> Receipts </h3>
      </div>
    </nav>
  );
};

export default ReceiptsNavbar;
