import React, { useState, useContext, useEffect } from "react";
import "./PaymentPage.css";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";
import { useNavigate } from "react-router-dom";
import CashBoard from "../cashBoard/CashBoard";
import ChequeBoard from "../chequeBoard/ChequeBoard";
import { AppStateContext } from "../../appState/appStateContext";
import { enqueueSnackbar } from "notistack";

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const { globalState, dispatch } = useContext(AppStateContext);
  const [isCheckAvailable] = useState(true);
  const [loading, setLoading] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [inputCostCash, setInputCostCash] = useState(0);
  const [inputCostCheque, setInputCostCheque] = useState(0);

  const navigate = useNavigate();


  useEffect(() => {
    let sum = 0;
    globalState?.cartItems.forEach(item => {
      const price = item.price;
      const count = item.count;
      sum += price * count;
    });
    setTotalAmount(sum);
    setRemainingAmount(sum);
  }, [globalState?.cartItems]);


  
  const remainingAmountHandler = () => {
    const amountPaid = inputCostCash + inputCostCheque;    
    const amountRemaining = totalAmount - amountPaid;
    setRemainingAmount(amountRemaining);
  };

  useEffect(() => {
    remainingAmountHandler();
  }, [inputCostCash, inputCostCheque,totalAmount ]);
  

  const backFunc = () => {
    navigate(-1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const createSale = async () => {
    const cashPaymentId = "60d5f9e9a60b2f1b4c3c1c84";
    const chequePaymentId = "60d5f9e9a60b2f1b4c3c1c85";
    const saleData = {
      customer_id: globalState?.selectedCustomer?._id,
      items: globalState?.cartItems?.map((item) => {
        return { _id: item._id, _count: item.count };
      }),
      employee_id: globalState?.loggedInUser?.user?._id,
      date_of_sale: new Date().toISOString(),
      payment_id: activeTab === "tab1" ? cashPaymentId : chequePaymentId,
      totalAmount: totalAmount.toFixed(2),

      cheques: globalState?.chequeList?.map((cheque) => ({
        bank_name: cheque?.bank_name,
        check_number: cheque?.check_number,
        amount: cheque?.amount,
        date: cheque?.date,
      })),
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL ?? "http://localhost:5467/api/v1"
        }/sales`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saleData),
        }
      );

      if (!response.ok) {
        setLoading(false);
        enqueueSnackbar("Something went wrong", { variant: "error" });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result) {
        dispatch({ type: "ADD_ITEM_TO_CART", payload: [] });
        dispatch({ type: "CURRENT_TRANSACTION", payload: saleData });
        setLoading(false);
        return true; // Return success status
      }
    } catch (error) {
      console.error("Error creating sale:", error);
      return false; // Return failure status
    }
  };


  return (
    <div className="payment-page">
      <div className="payment-page-header-container" >
        <NavigationHeader
          title="Payment Method"
          titleClassName="navigation-header-payment"
          NavigationHeaderImage={backIconImage}
          NavigationHeaderImageClassName="back-btn-image-icon"
          onClick={backFunc}
        />
        <div className="payment-page-total-invoice">
          <div className="payment-page-total-left">
            <h4 className={remainingAmount<=0?"payment-page-total-heading":"payment-page-total-heading-red"}>{remainingAmount<=0?"Return":"Due"}: <span>{Math.abs(remainingAmount)}</span></h4>
          </div>
          <div className="payment-page-total-right">
            <h4 className="payment-page-price-heading">LKR : {totalAmount}</h4>
          </div>
        </div>
        <div className="payment-page-tabs">
          <div
            className={
              activeTab === "tab1" ? "payment-cheque-tab" : "payment-cash-tab"
            }
            onClick={() => handleTabClick("tab1")}
          >
            <h4 className="payment-cash-heading">Cash</h4>
          </div>
          <div
            className={
              activeTab === "tab2" ? "payment-cheque-tab" : "payment-cash-tab"
            }
            onClick={() => handleTabClick("tab2")}
          >
            <h4 className="payment-cash-heading">Cheque</h4>
          </div>
        </div>
      </div>

      <div className="payment-page-body">
        {activeTab === "tab1" && (
          <CashBoard
          totalPrice={totalAmount}
          onClick={createSale}
          isLoading={loading}
          remainingAmount={remainingAmount}
          inputCost={inputCostCash}
          setInputCost={setInputCostCash}
        />
        )}
        {activeTab === "tab2" &&
          (isCheckAvailable ? (
            <ChequeBoard
              totalPrice={totalAmount}
              onClick={createSale}
              isLoading={loading}
              inputCost={inputCostCheque}
              setInputCost={setInputCostCheque}
              remainingAmount={remainingAmount}
            />
          ) : (
            <div className="service-message">
              This service is not available for now
            </div>
          ))}
      </div>
    </div>
  );
};

export default PaymentPage;
