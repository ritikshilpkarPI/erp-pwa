import React, { useContext, useEffect, useState } from "react";
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
  const [selectedDate, setSelectedDate] = useState("");

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
    const sortedData = data.sort((a, b) => new Date(b?.date_of_sale).getTime() - new Date(a?.date_of_sale).getTime());

    const groupedTransactions = sortedData?.reduce((acc: any, transaction: any) => {
      const date = new Date(transaction?.date_of_sale).toLocaleDateString("en-US", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      const time = new Date(transaction?.date_of_sale)?.toLocaleTimeString("en-US", {
        hour: '2-digit', minute: '2-digit'
      });

      if (!acc[date]) {
        acc[date] = {
          totalAmount: 0,
          items: []
        };
      }

      acc[date].totalAmount += transaction?.totalAmount;
      acc[date].items.push({
        amount: `LKR ${transaction?.totalAmount?.toFixed(2)}`,
        time,
        transactionId: transaction?._id
      });

      return acc;
    }, {});

    return Object?.entries(groupedTransactions)?.map(([date, { totalAmount, items }]: any) => ({
      date,
      totalAmount: `LKR ${totalAmount?.toFixed(2)}`,
      items
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const filteredTransactionHistory = selectedDate
    ? transactionHistory.filter((transaction: any) =>
        new Date(transaction.date_of_sale).toLocaleDateString("en-CA") === selectedDate
      )
    : transactionHistory;

  const formattedTransactionHistory = formatTransactionHistory(filteredTransactionHistory);

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
              <input
                className="filter-by-date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            {selectedDate && (
              <button className="clear-button" onClick={() => setSelectedDate("")}>Clear all filter</button>
            )}
          </div>
        </header>
        <div className="transaction-history-container">
          {formattedTransactionHistory?.length > 0 ? (
            formattedTransactionHistory?.map((transactionGroup: any, index: number) => (
              <React.Fragment key={index}>
                <DateSummary date={transactionGroup?.date} totalAmount={transactionGroup?.totalAmount} />
                {transactionGroup?.items?.map((transactionItem: any, itemIndex: number) => (
                  <TransactionCard
                    key={itemIndex}
                    amount={!transactionItem?.amount?.includes('undefined') ? transactionItem?.amount : 'LKR NA'}
                    time={transactionItem?.time}
                    transactionId={transactionItem?.transactionId}
                  />
                ))}
              </React.Fragment>
            ))
          ) : (
            <p>No transaction history available.</p>
          )}
        </div>
      </main>
    </>
  );
}
