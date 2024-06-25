import React from "react";
import "./CreateMenuPage.css";
import CartIcon from "../icons/CartIcon";

const TotalBar = ({ element, totalprize }) => {
  return (
    <div className="total-bar">
      <div className="total-bar-left">
        <CartIcon />
        <h4 className="total-bar-left-h4">
          {element > 1 ? `${element} elements` : `${element} element`}
        </h4>
      </div>
      <div className="total-bar-right">
        <h4 className="total-bar-left-h4">Total : INR {totalprize}.00</h4>
      </div>
    </div>
  );
};

export default TotalBar;
