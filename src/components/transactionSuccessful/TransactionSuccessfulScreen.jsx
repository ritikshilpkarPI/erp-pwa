import { useLocation, useNavigate } from "react-router-dom";
import TransactionIcon from "../../image/Transaction.png";
import "./TransactionSuccessfulScreen.css";

const TransactionSuccessfulScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/cart");
  };

  const handleSendBtn = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/download-invoice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: "6690d3350d42800a60c09051",
            customer_id: "667d033caef50bbed73f5aaa",
            items: [
              {
                _id: "668d2b9a022b15324c548438",
                _count: 3,
              },
              {
                _id: "668d0e9115031093f55d86fc",
                _count: 2,
              },
              {
                _id: "668cec567cd4e129c728409d",
                _count: 1,
              },
            ],
            employee_id: "668402c9c9b79d623023b69a",
            date_of_sale: "2024-07-12T06:54:45.072Z",
            payment_id: "60d5f9e9a60b2f1b4c3c1c84",
            totalAmount: 544,
          }),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      
      const contentType = response.headers.get("Content-Type");
      if (contentType !== "application/pdf") {
        throw new Error(`Expected PDF response, got ${contentType}`);
      }

      const blob = await response.blob();
      console.log("Blob:", blob);

      const url = URL.createObjectURL(blob);
      console.log("PDF URL:", url);

      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <div className="TransactionSuccessfull">
      <div className="TransactionSuccessfull-main-container">
        <div className="TransactionSuccessfull-header">
          <img src={TransactionIcon} alt="" className="transaction-icon" />
        </div>
        <div className="TransactionSuccessfull-content">
          <h2 className="TransactionSuccessfull-heading">
            Transaction successful!
          </h2>
          <p className="TransactionSuccessfull-note">
            NOTE: Don't forget to smile at the customers.
          </p>
        </div>
        <div className="TransactionSuccessfull-content-button">
          <div className="TransactionSuccessfull-content">
            <h1 className="TransactionSuccessfull-heading">
              Mode Of Payment : {location.state.mode}
            </h1>
          </div>
          <div className="TransactionSuccessfull-content2">
            <h1 className="TransactionSuccessfull-heading">
              Change: LKR {location.state.prize}
            </h1>
          </div>
        </div>
        <div className="TransactionSuccessfull-footer">
          <button className="TransactionSuccessfull-button-email">Email</button>
          <button
            className="TransactionSuccessfull-button-send-receipt"
            onClick={handleSendBtn}
          >
            SEND RECEIPT
          </button>
        </div>
      </div>
      <div className="TransactionSuccessfull-button-container">
        <button
          className="transaction-next-order-button transaction-successful"
          onClick={onClick}
        >
          NEXT ORDER
        </button>
      </div>
    </div>
  );
};

export default TransactionSuccessfulScreen;
