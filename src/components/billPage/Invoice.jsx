import React from "react";
import "./Invoice.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";
// import { enqueueSnackbar } from "notistack";
// import CloseIcon from "../../icons/CloseIcon";

const Invoice = () => {
  const location = useLocation();
  const data = location?.state;

  const transactionId = location?.state?.transaction._id;
  // const customerNumber = location?.state?.customer?.telephone;
  // const formattedNumber = customerNumber.replace(/-/g, "");
  
  const navigate = useNavigate();
  // const [countryCode, setCountryCode] = useState(94)
  // const [phoneNumber, setPhoneNumber] = useState(formattedNumber)

  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   if (value.length <= 10 && /^[0-9]*$/.test(value)) {
  //     setPhoneNumber(value);
  //   }
  // };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handlePrintClick = () => {
    window.print();
  };
  const copyAndShareLink = () => {
    const baseUrl = process.env.REACT_APP_FRONTEND_URL; 
    const invoiceUrl = `${baseUrl}/invoice-public/${transactionId}`;

    navigator.clipboard.writeText(invoiceUrl)
        .then(() => {
            // alert('Invoice link copied to clipboard!');

            if (navigator.share) {
                navigator.share({
                    title: 'Share Invoice',
                    text: 'Check out this invoice!',
                    url: invoiceUrl
                })
                .then(() => console.log('Thanks for sharing!'))
                .catch((error) => console.log('Error sharing:', error));
            } else {
                const shareWindow = window.open('', '_blank');
                shareWindow.document.write(`
                    <h2>Share this invoice</h2>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invoiceUrl)}" target="_blank">Share on Facebook</a><br>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(invoiceUrl)}" target="_blank">Share on Twitter</a><br>
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(invoiceUrl)}" target="_blank">Share on LinkedIn</a><br>
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(invoiceUrl)}" target="_blank">Share on WhatsApp</a>
                `);
                shareWindow.document.close();
            }
        })
        .catch((err) => {
            console.error('Failed to copy the link: ', err);
        });
};



  // const handleWhatsAppShare = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/whatsApp-invoice`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: transactionId,
  //         countryCode: countryCode,
  //         phoneNumber: phoneNumber,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const responseData = await response.json();

  //     // Redirect to the WhatsApp URL received in the response
  //     window.location.href = responseData.whatsappUrl;
  //   } catch (error) {
  //     console.error("Error sending invoice:", error);
  //     enqueueSnackbar("Failed to send invoice", { variant: "error" });
  //   }
  // };

  // const handleOpenPopup = () => {
  //   setIsPopupOpen(true);
  // };

  // const handleClosePopup = () => {
  //   setIsPopupOpen(false);
  // };
  // const isSetNember = (phoneNumber.length < 10) || !countryCode

  // const submitButtonClassname = isSetNember
  //   ? "submit-number-button-disabled"
  //   : "submit-number-button-enable"

  return (
    <div className="invoice">
      {/* {isPopupOpen &&
        <div className="whatsapp-number-popup"  >
          <div className="whatsapp-number-form-container">
            <div className="close-popup-button" onClick={handleClosePopup}>
              <CloseIcon />
            </div>
            <div className="whatsapp-number-input-container" >
              <select
                className="countryCode"
                id="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="91">IND</option>
                <option value="94">LKA</option>
              </select>
              <input
                type="number"
                placeholder="enter number"
                value={phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <button
              className={submitButtonClassname}
              onClick={handleWhatsAppShare}
              disabled={isSetNember}
            >Submit</button>
          </div>
        </div>
      } */}

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
          <button onClick={copyAndShareLink} className="print-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
