import React, { useState } from "react";
import "./ChequeBoard.css";
import TextInput from "../textInput/TextInput";
import ButtonInput from "../buttonInput/ButtonInput";

const ChequeBoard = ({totalPrice}) => {
  const [chequename, setChequeName] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [chequeAmount, setChequeAmount] = useState("");
  const [chequeDate, setChequeDate] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="cheque-board">
      <form onSubmit={submitHandler}>
        <TextInput
          className="cheque-page-input1"
          type="text"
          labelTitle="Cheque Name"
          placeholder="INR 0"
          value={chequename}
          onChange={(e) => setChequeName(e.target.value)}
        />
        <TextInput
          className="cheque-page-input2"
          type="number"
          labelTitle="Cheque Number"
          placeholder="INR 0"
          value={chequeNumber}
          onChange={(e) => setChequeNumber(e.target.value)}
        />
        <TextInput
          className="cheque-page-input3"
          type="number"
          labelTitle="Cheque Amount"
          placeholder="INR 0"
          value={chequeAmount}
          onChange={(e) => setChequeAmount(e.target.value)}
        />
        <TextInput
          className="cheque-page-input4"
          type="date"
          labelTitle="Cheque Date"
          placeholder="32/84/3000"
          value={chequeDate}
          onChange={(e) => setChequeDate(e.target.value)}
        />
        <ButtonInput
          type="submit"
          className="login-submit-button-input chequbtn"
          title="Complete Payment"
          onClick={() => {
            
          }}
        />
      </form>
    </div>
  );
};

export default ChequeBoard;
