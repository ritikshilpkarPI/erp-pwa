import React from "react";
import "./Invoice.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";

const Invoice = () => {
  const location = useLocation();
  const data = location.state;
  const navigation = useNavigate();
  console.log(location);

  const handleBackClick = () => {
    navigation(-1);
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
          <h1 className="invoice-header-heading">Avenue E-Commerce Limited</h1>
          <p>
            Avenue E-Commerce Ltd. Survey No. 6, Hissa No. 15, Barave Village
            Near Godrej Hill,
          </p>
          <p>Khadakpada, Kalyan West, Thane Maharashtra -421301</p>
        </div>
        <div className="invoice-body">
          <h2>BILL INVOICE</h2>
          <p>
            <strong>Customer ID:</strong> {data.transaction.customer_id}
          </p>
          <p>
            <strong>Payment ID:</strong> {data.transaction.payment_id}
          </p>
          <p>
            <strong>Total Amount:</strong> {data.transaction.totalAmount}
          </p>
          <p>
            <strong>Total Items:</strong> {data.items.length}
          </p>
          <table>
            <thead>
              <tr>
                <th>SR NO.</th>
                <th>NAME</th>
                <th>RATE (Rs.)</th>
                <th>CATEGORY</th>
                <th>QTY</th>
                <th>VALUE (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item._name}</td>
                  <td>{item._prize}</td>
                  <td>{item.category || "Unknown"}</td>
                  <td>{item._count}</td>
                  <td>{item._prize * item._count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>SUB TOTAL:</strong> {data.transaction.totalAmount}
          </p>
          <p>
            <strong>TXN NUMBER:</strong> {data.transaction.payment_id}
          </p>
          <p>
            <strong>ORDER TIME:</strong>{" "}
            {new Date(data.transaction.date_of_sale).toLocaleTimeString()}
          </p>
          <p>
            <strong>ORDER DATE:</strong>{" "}
            {new Date(data.transaction.date_of_sale).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default Invoice;
