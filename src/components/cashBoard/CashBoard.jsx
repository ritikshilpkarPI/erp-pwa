import React, { useState } from "react";
import "./CashBoard.css";
import WalletIcon from "../../icons/WalletIcon";
import TextInput from "../textInput/TextInput";
import ButtonInput from "../buttonInput/ButtonInput";
import { useNavigate } from "react-router-dom";

const CashBoard = ({ totalPrice }) => {
  const [InputCost, setInputCost] = useState();
  const submitHandler = (e) => e.preventDefault();
  const navigate = useNavigate();
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
          value={InputCost}
          onChange={(e) => {
            setInputCost(parseInt(e.target.value, 10));
          }}
        />
        <TextInput
          className="cash-page-input1"
          type="number"
          labelTitle={InputCost>totalPrice?"Amount Give":"Amount Due"}
          placeholder="INR 0"
          value={InputCost - totalPrice}
        />
        <ButtonInput
          type="submit"
          className="login-submit-button-input"
          title="Complete Payment"
          onClick={() => {
            navigate('/transactionSuccessfull')
          }}
        />
      </form>
    </div>
  );
};

export default CashBoard;
