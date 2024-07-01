import React, { useContext, useEffect } from "react";
import "./TransactionHistory.css";
import backButtonImage from "../../image/BackButton.svg";
import { useNavigate } from "react-router-dom";
import { AppStateContext } from "../../appState/appStateContext";

interface TransactionCardProps {
  amount: string;
  time: string;
  transactionId: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ amount, time, transactionId }) => (
  <article className="transaction-card">
    <div className="transaction-details">
      <div className="transaction-amount">{amount}</div>
      <div className="transaction-info">{`${time} - #${transactionId}`}</div>
    </div>
    <div className="status-badge">PAID</div>
  </article>
);

interface DateSummaryProps {
  date: string;
  totalAmount: string;
}

const DateSummary: React.FC<DateSummaryProps> = ({ date, totalAmount }) => (
  <section className="date-summary">
    <div className="date">{date}</div>
    <div className="total-amount">{totalAmount}</div>
  </section>
);

export function TransactionHistory() {
  const navigate = useNavigate();
  const { globalState, dispatch } = useContext(AppStateContext);
  const API = `${process.env.REACT_APP_SIGNUP_URL ?? "http://localhost:5467/api/v1"}/sales`;

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "SET_TRANSACTION_HISTORY", payload: res });
      })
      .catch((error) => console.error("Error fetching transaction history:", error));
  }, [dispatch, API]);

  const transactionHistory = globalState?.transactionHistory || [];

  const formatTransactionHistory = (data: any[]) => {
    // Group transactions by date
    const groupedTransactions = data.reduce((acc: any, transaction: any) => {
      const date = new Date(transaction.date_of_sale).toLocaleDateString("en-US", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      const time = new Date(transaction.date_of_sale).toLocaleTimeString("en-US", {
        hour: '2-digit', minute: '2-digit'
      });

      if (!acc[date]) {
        acc[date] = {
          totalAmount: 0,
          items: []
        };
      }

      acc[date].totalAmount += transaction.totalAmount;
      acc[date].items.push({
        amount: `INR ${transaction.totalAmount.toFixed(2)}`,
        time,
        transactionId: transaction._id
      });

      return acc;
    }, {});

    return Object.entries(groupedTransactions).map(([date, { totalAmount, items }]: any) => ({
      date,
      totalAmount: `INR ${totalAmount.toFixed(2)}`,
      items
    }));
  };

  const formattedTransactionHistory = formatTransactionHistory(transactionHistory);

  return (
    <>
      <main className="transaction-history">
        <header className="header">
          <div className="navigation-button-container-history" onClick={() => navigate(-1)}>
            <img className="navigation-button-container-history-btn" src={backButtonImage} alt="Back Button" />
            <h1 className="title navigation-button-container-history-btn-title">Transaction History</h1>
          </div>
          <div className="filter-section">
            <div className="filter-label">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e1014186ee482b9f7f7ef6a523f6f756981b0dc6bd24b1364ee7b877e96ba36?apiKey=d03ff6b018f84c75b88104249d2053b6&"
                className="filter-icon"
                alt="Filter Icon"
              />
              <div className="filter-text">Date and Time of Filter</div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/202f00e4a88f1f8cb63723f2ab74511e60aaa75360a6b04f24fbef81723b5813?apiKey=d03ff6b018f84c75b88104249d2053b6&"
              className="filter-arrow"
              alt="Filter Arrow"
            />
          </div>
        </header>
        {formattedTransactionHistory.length > 0 ? (
          formattedTransactionHistory.map((transactionGroup, index) => (
            <React.Fragment key={index}>
              <DateSummary date={transactionGroup.date} totalAmount={transactionGroup.totalAmount} />
              {transactionGroup.items.map((transactionItem: any, itemIndex: number) => (
                <TransactionCard
                  key={itemIndex}
                  amount={transactionItem.amount}
                  time={transactionItem.time}
                  transactionId={transactionItem.transactionId}
                />
              ))}
            </React.Fragment>
          ))
        ) : (
          <p>No transaction history available.</p>
        )}
      </main>
    </>
  );
}
