import React, { useState } from "react";
import "./CashBoard.css";
import WalletIcon from "../../icons/WalletIcon";
import TextInput from "../textInput/TextInput";
import ButtonInput from "../buttonInput/ButtonInput";

const CashBoard = ({ totalPrice, onClick }) => {
  const [inputCost, setInputCost] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();
    onClick(); 
  };

  return (
    <div className="cash-board">
      <div className="exact-amount">
        <WalletIcon /> <h4 className="exact-amount-btn-title">EXACT AMOUNT</h4>
      </div>
      <form onSubmit={submitHandler} className="cash-page-form">
        <TextInput
          className="cash-page-input"
          type="number"
          labelTitle="Input costs"
          placeholder="INR 0"
          value={inputCost}
          onChange={(e) => {
            setInputCost(parseInt(e.target.value, 10));
          }}
        />
        <TextInput
          className="cash-page-input1"
          type="number"
          labelTitle={inputCost > totalPrice ? "Amount Given" : "Amount Due"}
          placeholder="INR 0"
          value={inputCost - totalPrice}
          readOnly
        />
        <ButtonInput
          type="submit"
          className="login-submit-button-input"
          title="Complete Payment"
          onClick={() => {
          }}
        />
      </form>
    </div>
  );
};

export default CashBoard;
