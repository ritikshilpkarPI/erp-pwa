import React, { useMemo } from "react";
import "./CreateMenuPage.css";
import CartIcon from "../../icons/CartIcon";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../appState/appStateContext";

const TotalBar = ({ element }) => {
  const { globalState } = useAppContext();
  const navigate = useNavigate();

  const onclick = () => {
    navigate('/placeorder');
  };

  const totalPrice = useMemo(() => {
    return globalState.cartItems.reduce((total, item) => total + (item.price_per_unit * item.count), 0).toFixed(2);
  }, [globalState.cartItems]);

  return (
    <div className="total-bar" onClick={onclick}>
      <div className="total-bar-left">
        <CartIcon />
        <h4 className="total-bar-left-h4">
          {element > 1 ? `${element} elements` : `${element} element`}
        </h4>
      </div>
      <div className="total-bar-right">
        <h4 className="total-bar-left-h4">Total : INR {totalPrice}</h4>
      </div>
    </div>
  );
};

export default TotalBar;
