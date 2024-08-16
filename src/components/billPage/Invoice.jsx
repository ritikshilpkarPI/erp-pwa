import React from "react";
import "./Invoice.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";

const Invoice = () => {
  const location = useLocation();
  const data = location?.state;
  const navigate = useNavigate();
  console.log(location);
  console.log(data);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handlePrintClick = () => {
    window.print();
  };

  return (
    <>
      <NavigationHeader
        title="Invoice"
        titleClassName="navigation-invoice-login"
        NavigationHeaderImage={backIconImage}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={handleBackClick}
      />
      <div className="invoice-container">
        <div className="invoice-header">
          <h2 className="invoice-header-text">BILL INVOICE</h2>
          <div className="invoice-header-body">

          <div className="invoice-header-left">

            <p>
              <strong>Customer Name:</strong> {data?.customer?.name}
            </p>

            <p>
              <strong>Total Amount:</strong> {data?.transaction?.totalAmount}
            </p>
            <p>
              <strong>Total Items:</strong> {data?.items?.length}
            </p>

          </div>
          <div className="invoice-header-right">
            <p>
              <strong>Business Name:</strong> {data?.employeData?.business_name}
            </p>

            <p>
              <strong>Address:</strong> {data?.employeData?.address}
            </p>
            <p>
              <strong>Number:</strong> {data?.employeData?.phone_number}
            </p>

            <h1 className="invoice-header-heading">

            </h1>
          </div>
          </div>

        </div>
        <div className="invoice-body">

          <table>
            <thead>
              <tr>
                <th>SR NO.</th>
                <th>NAME</th>
                <th>RATE (Rs.)</th>
                <th>QTY</th>
                <th>VALUE (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item._name}</td>
                  <td>{item._prize}</td>
                  <td>{item._count}</td>
                  <td>{item._prize * item._count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>SUB TOTAL:</strong> {data?.transaction?.totalAmount}
          </p>
          <p>
            <strong>ORDER TIME:</strong>
            {new Date(data?.transaction?.date_of_sale).toLocaleTimeString()}
          </p>
          <p>
            <strong>ORDER DATE:</strong>
            {new Date(data?.transaction?.date_of_sale).toLocaleDateString()}
          </p>
        </div>
        <div className="print-btn-outer">
          <button onClick={handlePrintClick} className="print-button">
            Print Invoice
          </button>
        </div>
      </div>
    </>
  );
};

export default Invoice;
