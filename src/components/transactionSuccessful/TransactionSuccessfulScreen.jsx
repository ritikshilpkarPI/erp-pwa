import { useNavigate } from "react-router-dom"
import TransactionIcon from "../../image/Transaction.png"
import './TransactionSuccessfulScreen.css'
const TransactionSuccessfulScreen = () => {
    const navigate= useNavigate()
    const onClick = () => {
        navigate('/cart')
    }
    return (
      <>
        <div className="TransactionSuccessfull-main-container">
          <div className="TransactionSuccessfull-header">
            <img
              src={TransactionIcon}
              alt=""
              height={"250px"}
              width={"250px"}
            />
          </div>
          <div className="TransactionSuccessfull-content">
            <h2 className="TransactionSuccessfull-heading">
              Transaction successful!
            </h2>
            <p>NOTE: Don't forget to smile at the customers.</p>
          </div>
          <div className="TransactionSuccessfull-content-button">
            <div className="TransactionSuccessfull-content">
              <h1 className="TransactionSuccessfull-heading">
                Mode Of Payment : CASH
              </h1>
            </div>
            <div className="TransactionSuccessfull-content2">
              <h1 className="TransactionSuccessfull-heading">
                Change: GNF 170.00
              </h1>
            </div>
          </div>
          <div className="TransactionSuccessfull-footer">
            <button className="TransactionSuccessfull-button-email">Email</button>
            <button className="TransactionSuccessfull-button-send-receipt" onClick={onClick}>
              SEND RECEIPT
            </button>
          </div>
        </div>
      </>
    );
}
export default TransactionSuccessfulScreen
