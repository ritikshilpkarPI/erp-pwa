import React from "react";
import MoneyIcon from "../icons/MoneyIcon";

const ReceiptsTile = ({ amount, time, randomNum }) => {
  return (
    <div className="receipt-tile">
      <MoneyIcon />
      <div className="recipt-tile-box">
        <div className="recipt-tile-content-left">
          <h4 className="recipt-tile-title">Rs {amount} </h4>
          <h5 className="recipt-tile-subtitle"> {time} </h5>
        </div>
        <div className="recipt-tile-content-right">{randomNum}</div>
      </div>
    </div>
  );
};

export default ReceiptsTile;
