import { useLocation, useNavigate } from "react-router-dom";
import TransactionIcon from "../../image/Transaction.png";
import "./TransactionSuccessfulScreen.css";
const TransactionSuccessfulScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/cart");
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
              Change: GNF {location.state.prize}
            </h1>
          </div>
        </div>
        <div className="TransactionSuccessfull-footer">
          <button className="TransactionSuccessfull-button-email">Email</button>
          <button className="TransactionSuccessfull-button-send-receipt">
            SEND RECEIPT
          </button>
        </div>
      </div>
      <div className="TransactionSuccessfull-button-container">
        <button className="transaction-print-receipt-button">
          PRINT RECEIPT
        </button>
        <button className="transaction-next-order-button" onClick={onClick}>
          NEXT ORDER
        </button>
      </div>
    </div>
  );
};
export default TransactionSuccessfulScreen;
