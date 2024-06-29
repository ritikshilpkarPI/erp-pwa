import React, { useState } from "react";
import "./PaymentPage.css";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";
import { useNavigate } from "react-router-dom";
import CashBoard from "../cashBoard/CashBoard";
import ChequeBoard from "../chequeBoard/ChequeBoard";

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState("tab2");

  const navigate = useNavigate();
  const backFunc = () => {
    navigate(-1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
          <h4 className="payment-page-price-heading">INR : 150.00</h4>
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
        {activeTab === "tab1" && <CashBoard totalPrice={150}/>}
        {activeTab === "tab2" && <ChequeBoard />}
      </div>
    </div>
  );
};

export default PaymentPage;
