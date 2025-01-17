import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CashBoard.css";
import WalletIcon from "../../icons/WalletIcon";
import TextInput from "../textInput/TextInput";
import ButtonInput from "../buttonInput/ButtonInput";
import { AppStateContext } from "../../appState/appStateContext";
import { enqueueSnackbar } from "notistack";

const CashBoard = ({ totalPrice, onClick, isLoading, remainingAmount, inputCost, setInputCost, creditLimit, customer = {} }) => {
  const navigate = useNavigate();
  const { globalState } = useContext(AppStateContext);
  const selectedCustomer = globalState?.selectedCustomer;

  const [hasEdited, setHasEdited] = useState(false);
  const handleExtractAmount = () => {
    setInputCost(totalPrice);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      (!selectedCustomer || Object.keys(selectedCustomer).length === 0) &&
      (!customer || Object.keys(customer).length === 0) &&
      (inputCost !== totalPrice) 
    ) {
      enqueueSnackbar("Please select a customer before completing the payment.", { variant: "error" });
      return; 
    }
    
    const response = await onClick();

    if (response) {
      navigate("/transactionSuccessfull", {
        state: {
          mode: "CASH",
          prize: totalPrice,
        },
      });
    }
  };
  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value !== '' && parseFloat(value) < 0) {
      return;
    }
    if (!hasEdited) {
      value = value.replace(/^0+/, "");
      setHasEdited(true);
    }
    setInputCost(value === "" ? "" : parseInt(value, 10));
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
          value={inputCost === 0 && !hasEdited ? "" : inputCost}
          onChange={handleInputChange}
        />
        <TextInput
          className="cash-page-input1"
          type="number"
          labelTitle={remainingAmount < 0 ? "Amount Return" : "Amount Due"}
          placeholder="LKR 0"
          value={Math.abs(remainingAmount)?.toFixed(2)}
          readOnly
        />
        <ButtonInput
          type="submit"
          className="login-submit-button-input"
          title="Complete Payment"
          disabled={
            creditLimit < remainingAmount ||
            ((!selectedCustomer || Object.keys(selectedCustomer).length === 0) &&
              (!customer || Object.keys(customer).length === 0) &&
              (inputCost !== totalPrice)) || isLoading
          }
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};

export default CashBoard;
