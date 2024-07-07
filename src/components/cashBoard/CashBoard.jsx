import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CashBoard.css";
import WalletIcon from "../../icons/WalletIcon";
import TextInput from "../textInput/TextInput";
import ButtonInput from "../buttonInput/ButtonInput";

const CashBoard = ({ totalPrice, onClick, isLoading }) => {
  const [inputCost, setInputCost] = useState("");
  const navigate = useNavigate();
 const handleExtractAmount=()=>{
  setInputCost(totalPrice);
 }
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await onClick();

    if (response && inputCost > 0) {
      navigate("/transactionSuccessfull", {
        state: {
          mode: "CASH",
          prize: totalPrice,
        },
      });
    }
  };

  return (
    <div className="cash-board">
      <div className="exact-amount" onClick={handleExtractAmount}>
        <WalletIcon /> <h4 className="exact-amount-btn-title">EXACT AMOUNT</h4>
      </div>
      <form onSubmit={submitHandler} className="cash-page-form">
        <TextInput
          className="cash-page-input"
          type="number"
          labelTitle="Input costs"
          placeholder="LKR 0"
          value={inputCost}
          onChange={(e) => {
            setInputCost(parseInt(e.target.value, 10) || "");
          }}
        />
        <TextInput
          className="cash-page-input1"
          type="number"
          labelTitle={inputCost > totalPrice ? "Amount Given" : "Amount Due"}
          placeholder="LKR 0"
          value={(inputCost - totalPrice)?.toFixed(2)}
          readOnly
        />
        <ButtonInput
          type="submit"
          className="login-submit-button-input"
          title="Complete Payment"
          disabled={inputCost === 0 || inputCost === ""}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};

export default CashBoard;
