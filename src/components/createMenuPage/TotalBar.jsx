import React from "react";
import "./CreateMenuPage.css";
import CartIcon from "../../icons/CartIcon";
import { useNavigate } from "react-router-dom";

const TotalBar = ({ element, totalprize }) => {
  const navigate = useNavigate();
  const onclick =()=>{
   navigate('/placeorder')
  }
  return (
    <div className="total-bar" onClick={onclick}>
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
