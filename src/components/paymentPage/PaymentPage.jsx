import React, { useState, useContext, useMemo } from "react";
import "./PaymentPage.css";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";
import { useNavigate } from "react-router-dom";
import CashBoard from "../cashBoard/CashBoard";
import ChequeBoard from "../chequeBoard/ChequeBoard";
import { AppStateContext } from "../../appState/appStateContext";

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState("tab2");
  const { globalState } = useContext(AppStateContext);

  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return globalState.cartItems
      .reduce((total, item) => total + item.price_per_unit * item.count, 0)
      .toFixed(2);
  }, [globalState.cartItems]);

  const backFunc = () => {
    navigate(-1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const createSale = async () => {
    const cashPaymentId = '60d5f9e9a60b2f1b4c3c1c84'; 
    const chequePaymentId = '60d5f9e9a60b2f1b4c3c1c85'; 

    const saleData = {
      customer_id: globalState?.setCustomer?._id,
      item_id: globalState?.cartItems?.map(item => item._id),
      employee_id: globalState?.loggedInUser?._id,
      date_of_sale: new Date().toISOString(),
      payment_id: activeTab === "tab1" ? cashPaymentId : chequePaymentId
    };
    console.log(saleData);

    try {
      const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL ?? 'http://localhost:5467/api/v1'}/sales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Sale created successfully:', result);

      if (result) {
        // dispatch({ type: 'ADD_ITEM_TO_CART', payload: [] });
        // navigate('/transactionSuccessfull');
      }
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };
  

  return (
    <div className="payment-page">
      <NavigationHeader
        title="Payment Method"
        titleClassName="navigation-header-payment"
        NavigationHeaderImage={backIconImage}
        NavigationHeaderImageClassName="back-btn-image-icon"
        onClick={backFunc}
      />
      <div className="payment-page-total-invoice">
        <div className="payment-page-total-left">
          <h4 className="payment-page-total-heading">Total invoice</h4>
        </div>
        <div className="payment-page-total-right">
          <h4 className="payment-page-price-heading">INR : {totalPrice}</h4>
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

      <div className="payment-page-body">
        {activeTab === "tab1" && (
          <CashBoard totalPrice={totalPrice} onClick={createSale} />
        )}
        {activeTab === "tab2" && <ChequeBoard onClick={createSale} />}
      </div>
    </div>
  );
};

export default PaymentPage;