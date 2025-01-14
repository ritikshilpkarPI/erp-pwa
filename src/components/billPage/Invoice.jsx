import React from "react";
import "./Invoice.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";
// import onNativeShare from "../../utils/onNativeShare";

const Invoice = () => {
  const location = useLocation();
  const data = location?.state;

  const transactionId = location?.state?.transaction._id;

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handlePrintClick = () => {
    window.print();
  };
  const copyAndShareLink = async () => {
    const baseUrl = process.env.REACT_APP_FRONTEND_URL ?? "";
    const invoiceUrl = `${baseUrl}/invoice-public/${transactionId}`;
    const invoiceName = `invoice-${Date.now()}`;
    let invoiceImage;
    try {
      const response = await fetch(invoiceUrl);
      const blob = await response.blob();
      invoiceImage = new File([blob], `invoice-${Date.now()}`, {
        type: blob.type,
      });
    } catch (err) {}

    // if (
    //   !onNativeShare({
    //     title: invoiceName,
    //     files: [invoiceImage],
    //   })
    // ) {
      navigator.clipboard
        .writeText(invoiceUrl)
        .then(() => {
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [invoiceImage] })) {
            navigator
              .share({
                title: invoiceName,
                text: "Check out this invoice!",
                url: invoiceUrl,
              })
              .then(() => console.log("Thanks for sharing!"))
              .catch((error) => console.log("Error sharing:", error));
          } else {
            const shareWindow = window.open("", "_blank");
            shareWindow.document.write(`
                    <h2>Share this invoice</h2>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      invoiceUrl
                    )}" target="_blank">Share on Facebook</a><br>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      invoiceUrl
                    )}" target="_blank">Share on Twitter</a><br>
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      invoiceUrl
                    )}" target="_blank">Share on LinkedIn</a><br>
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(
                      invoiceUrl
                    )}" target="_blank">Share on WhatsApp</a>
                `);
            shareWindow.document.close();
          }
        })
        .catch((err) => {
          console.error("Failed to copy the link: ", err);
        });
    // }
  };

  const quantityTypeConstant = {
    "price_per_unit": "Unit",
    "price_per_dozen": "Dozen",
    "price_per_carton": "Carton",
  };

  return (
    <div className="invoice">
      <NavigationHeader
        title="Invoice"
        titleClassName="navigation-invoice-login"
        NavigationHeaderImage={backIconImage}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={handleBackClick}
      />
      <div className="invoice-container">
        <div className="invoice-header">
          <h2 className="invoice-header-text">INVOICE</h2>
          <div className="invoice-header-body">
            <div className="invoice-header-left">
              <p className="invoice-header-left-p">
                <strong>Business Name:</strong>{" "}
                {data?.employeData?.business_name}
              </p>
              <p className="invoice-header-left-p">
                <strong>Address:</strong> {data?.employeData?.address}
              </p>
              <p className="invoice-header-left-p">
                <strong>Number:</strong> {data?.employeData?.phone_number}
              </p>
            </div>

            <div className="invoice-header-right">
              <p className="invoice-header-right-p">
                <strong>
                  {data?.customer?.name ? "Customer Name:" : "Type"}
                </strong>{" "}
                {data?.customer?.name ? data?.customer?.name : "Cash"}
              </p>
              <p className="invoice-header-right-p">
                <strong>Total Amount:</strong> {data?.transaction?.totalAmount}
              </p>
              <p className="invoice-header-right-p">
                <strong>Remaining Amount:</strong> {data?.transaction?.remainingAmount}
              </p>
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
                <th>QTY TYPE</th>
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
                  <td>{quantityTypeConstant[item.quantityType]}</td>
                  <td>{item._prize * item._count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-body-bottom">
            <div className="invoice-body-bottom-left">
              <p className="invoice-body-bottom-left-p">
                <strong>Total Items: {data?.totalQuantity}</strong>
              </p>
              <p className="invoice-body-bottom-left-p">
                <strong>Sub Total: {data?.transaction?.totalAmount}</strong>
              </p>
            </div>

            <div className="invoice-body-bottom-right">
              <p className="invoice-body-bottom-right-p">
                <strong>Order Time: </strong>
                {new Date(data?.transaction?.date_of_sale).toLocaleTimeString()}
              </p>
              <p className="invoice-body-bottom-right-p">
                <strong>Order Date: </strong>
                {new Date(data?.transaction?.date_of_sale).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="print-btn-outer">
          <button onClick={handlePrintClick} className="print-button">
            Print Invoice
          </button>
          <button onClick={copyAndShareLink} className="print-button">
            Share Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
