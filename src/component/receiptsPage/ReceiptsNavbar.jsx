import React from "react";
import "./ReceiptsPage.css";
import HamBurgerIcon from "../icons/HamBurgerIcon";

const ReceiptsNavbar = () => {
  return (
    <nav className="categories-navbar">
      <div className="categories-navbar-menu">
        <HamBurgerIcon />
        <h3 className="categories-navbar-heading"> Receipts </h3>
      </div>
    </nav>
  );
};

export default ReceiptsNavbar;
