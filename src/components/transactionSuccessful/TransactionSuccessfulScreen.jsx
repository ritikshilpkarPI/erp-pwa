import { useLocation, useNavigate } from "react-router-dom";
import TransactionIcon from "../../image/Transaction.png";
import "./TransactionSuccessfulScreen.css";
import { AppStateContext } from "../../appState/appStateContext";
import { useContext, useState } from "react";
import ButtonInput from "../buttonInput/ButtonInput";
import { enqueueSnackbar } from "notistack";

const TransactionSuccessfulScreen = () => {
  const { globalState, dispatch } = useContext(AppStateContext);
  const [transaction] = useState(globalState?.currentTransaction)
  const [useremail, setUseremail] = useState(
    globalState.selectedCustomer?.email || ""
  );
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  // const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/landing");
    dispatch({ type: "SET_CHEQUE_LIST", payload: [] });
    dispatch({ type: "CURRENT_TRANSACTION", payload: {} });
  };

  const handleEmailSendBtn = async () => {
    setIsEmailLoading(true);
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/email-invoice?email=${useremail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(transaction),
          credentials: "include"
        }
      );

      await response.json();
      enqueueSnackbar("Email sent successfully!", { variant: "success" });
      setUseremail("");
    } catch (error) {
      console.error("Error sending email:", error);
      enqueueSnackbar("Error sending email.", { variant: "error" });
    } finally {
      setIsEmailLoading(false);
    }
  };

  // const handleSendBtn = async () => {
  //   setIsDownloadLoading(true);
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BASE_URL}/download-invoice`,
  //       {
  //         method: "POST",
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(globalState?.currentTransaction),
  //         credentials: "include"
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const contentType = response.headers.get("Content-Type");
  //     if (contentType !== "application/pdf") {
  //       throw new Error(`Expected PDF response, got ${contentType}`);
  //     }

  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "invoice.pdf");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();

  //     URL.revokeObjectURL(url);

  //     enqueueSnackbar("PDF downloaded successfully!", { variant: "success" });
  //   } catch (error) {
  //     console.error("Error fetching PDF:", error);
  //     enqueueSnackbar("Error downloading PDF.", { variant: "error" });
  //   } finally {
  //     setIsDownloadLoading(false);
  //   }
  // };

  return (
    <div className="TransactionSuccessfull" >
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
          <input
            type="email"
            placeholder="Enter your email"
            className="transtaction-email-input"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
          />

          <ButtonInput
            disabled={!useremail}
            className="TransactionSuccessfull-button-send-receipt"
            onClick={handleEmailSendBtn}
            title="SEND RECEIPT"
            isLoading={isEmailLoading}
          />
        </div>
      </div>

      <ButtonInput
        type="submit"
        className="next-order-button-input"
        title="NEXT ORDER"
        onClick={onClick}
      />
    </div>
  );
};

export default TransactionSuccessfulScreen;
