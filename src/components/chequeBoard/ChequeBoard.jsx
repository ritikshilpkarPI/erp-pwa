import React, { useState, useContext, useEffect } from "react";
import "./ChequeBoard.css";
import TextInput from "../textInput/TextInput";
import ButtonInput from "../buttonInput/ButtonInput";
import { useNavigate } from "react-router-dom";
import { AppStateContext } from "../../appState/appStateContext";

const ChequeBoard = ({ totalPrice, onClick, inputCost, setInputCost, remainingAmount }) => {
  const { globalState, dispatch } = useContext(AppStateContext);
  const [openForm, setOpenForm] = useState(false);
  const [chequeName, setChequeName] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [chequeAmount, setChequeAmount] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  // const [inputCost, setInputCost] = useState(0);

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const newCheque = {
      bank_name: chequeName,
      check_number: chequeNumber,
      amount: chequeAmount,
      date: chequeDate,
    };

    dispatch({ type: "ADD_CHEQUE_LIST", payload: newCheque });

    setChequeName("");
    setChequeNumber("");
    setChequeAmount("");
    setChequeDate("");

    setOpenForm(false);
  };

  useEffect(() => {
    let totalInputCost = 0;
    globalState?.chequeList.forEach((cheque) => {
      totalInputCost += Number(cheque.amount);
    });
    setInputCost(totalInputCost || 0);
  }, [globalState?.chequeList]);



  const completePaymentHandler = async () => {
    const response = await onClick();
    if (response && inputCost > 0) {
      navigate("/transactionSuccessfull", {
        state: {
          mode: "CHEQUE",
          prize: totalPrice,
        },
      });
    }
  };

  const addChequeHandler = () => {
    setOpenForm(!openForm);
  };

  const isChequeListEmpty = globalState?.chequeList?.length === 0 || remainingAmount>0 ;
  const buttonClassName = isChequeListEmpty
    ? "complete-payment-button-input-disabled"
    : "complete-payment-button-input-enabled";

  const isFormValid = chequeName && chequeNumber && chequeAmount && chequeDate;
  const submitButtonClass = !isFormValid
    ? "cheque-submit-button-input-disabled"
    : "cheque-submit-button-input-enabled";

  return (
    <div className="cheque-board">
      <div className="cheque-card-list">
        {globalState?.chequeList?.map((cheque, index) => (
          <div key={index} className="cheque-card">
            <div className="cheque-index">
              <h2>{index + 1}</h2>
            </div>
            <div className="cheque-text">
              <p>Bank Name: {cheque.bank_name}</p>
              <p>Cheque Number: {cheque.check_number}</p>
              <p>Amount: {cheque.amount}</p>
              <p>Date: {cheque.date}</p>
            </div>
          </div>
        ))}
      </div>

      {openForm ? (
        <form className="add-cheque-form-input" onSubmit={submitHandler}>
          <TextInput
            className="cheque-page-input1"
            type="text"
            labelTitle="Bank Name"
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
          <div className="cheque-page-input4-container">
            <label className="cheque-page-input4-laber">Cheque Date</label>

            <input
              className={`cheque-page-input4 ${
                Boolean(chequeDate)
                  ? "cheque-page-input4-filled"
                  : "cheque-page-input4-not-filled"
              }`}
              type="date"
              value={chequeDate}
              onChange={(e) => setChequeDate(e.target.value)}
            />
          </div>
          <ButtonInput
            type="submit"
            title="Submit"
            className={submitButtonClass}
            disabled={!isFormValid}
          />
        </form>
      ) : (
        <button className="add-cheque-button-input" onClick={addChequeHandler}>
          Add Cheque
        </button>
      )}

      <button
        className={buttonClassName}
        disabled={isChequeListEmpty}
        onClick={completePaymentHandler}
      >
        Complete Payment
      </button>
    </div>
  );
};

export default ChequeBoard;
