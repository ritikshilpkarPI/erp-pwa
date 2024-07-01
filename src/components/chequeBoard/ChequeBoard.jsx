import React, { useState, useContext } from "react";
import "./ChequeBoard.css";
import TextInput from "../textInput/TextInput";
import ButtonInput from "../buttonInput/ButtonInput";
import { useNavigate } from "react-router-dom";
import { AppStateContext } from "../../appState/appStateContext";

const ChequeBoard = ({ totalPrice, onClick }) => {
  const { dispatch } = useContext(AppStateContext);

  const [chequeName, setChequeName] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [chequeAmount, setChequeAmount] = useState("");
  const [chequeDate, setChequeDate] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    onClick();

    dispatch({ type: 'ADD_ITEM_TO_CART', payload: [] });

    navigate("/transactionSuccessfull", {
      state: {
        mode: "CHEQUE",
        prize: totalPrice,
      },
    });
  };

  return (
    <div className="cheque-board">
      <form onSubmit={submitHandler}>
        <TextInput
          className="cheque-page-input1"
          type="text"
          labelTitle="Cheque Name"
          placeholder="Enter cheque name"
          value={chequeName}
          onChange={(e) => setChequeName(e.target.value)}
        />
        <TextInput
          className="cheque-page-input2"
          type="number"
          labelTitle="Cheque Number"
          placeholder="Enter cheque number"
          value={chequeNumber}
          onChange={(e) => setChequeNumber(e.target.value)}
        />
        <TextInput
          className="cheque-page-input3"
          type="number"
          labelTitle="Cheque Amount"
          placeholder="Enter cheque amount"
          value={chequeAmount}
          onChange={(e) => setChequeAmount(e.target.value)}
        />
        <TextInput
          className="cheque-page-input4"
          type="date"
          labelTitle="Cheque Date"
          placeholder="Enter cheque date"
          value={chequeDate}
          onChange={(e) => setChequeDate(e.target.value)}
        />
        <ButtonInput
          type="submit"
          className="login-submit-button-input chequbtn"
          title="Complete Payment"
        />
      </form>
    </div>
  );
};

export default ChequeBoard;
