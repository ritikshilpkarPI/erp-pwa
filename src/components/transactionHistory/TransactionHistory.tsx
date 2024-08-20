import React, { useContext, useEffect, useState } from "react";
import "./TransactionHistory.css";
import { useNavigate } from "react-router-dom";
import { AppStateContext } from "../../appState/appStateContext";
import LoadingCircle from "../loadinCircule/LoadingCircle";
import backIconImage from "../../image/BackIcon.svg";
import NavigationHeader from "../navigationHeader/NavigationHeader";

interface TransactionCardProps {
  amount: string;
  time: string;
  transactionId: string;
  onClick: (transactionId: string) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  amount,
  time,
  transactionId,
  onClick,
}) => (
  <article className="transaction-card" onClick={() => onClick(transactionId)}>
    <div className="transaction-details">
      <div className="transaction-amount">{amount}</div>
      <div className="transaction-info">{time}</div>
      <div className="transaction-info">
        Trans Id - {transactionId.slice(-6)}
      </div>
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
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "SET_TRANSACTION_HISTORY", payload: res });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transaction history:", error);
        setLoading(false);
      });
  }, [dispatch, API]);
  

  const transactionHistory = globalState?.transactionHistory || [];

  const formatTransactionHistory = (data: any[]) => {
    const sortedData = data.sort(
      (a, b) =>
        new Date(b?.date_of_sale).getTime() -
        new Date(a?.date_of_sale).getTime()
    );

    const groupedTransactions = sortedData.reduce(
      (acc: any, transaction: any) => {
        const date = new Date(transaction?.date_of_sale).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
        const time = new Date(transaction?.date_of_sale)?.toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        if (!acc[date]) {
          acc[date] = {
            totalAmount: 0,
            items: [],
          };
        }

        acc[date].totalAmount += transaction?.totalAmount;
        acc[date].items.push({
          amount: `LKR ${transaction?.totalAmount?.toFixed(2)}`,
          time,
          transactionId: transaction?._id,
        });

        return acc;
      },
      {}
    );

    return Object.entries(groupedTransactions).map(
      ([date, { totalAmount, items }]: any) => ({
        date,
        totalAmount: `LKR ${totalAmount?.toFixed(2)}`,
        items,
      })
    );
  };

  const GetSaleById = async (id: string) => {
    try {
      setLoadingDetail(true);
      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/transaction-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      setLoadingDetail(false);
      if (response.ok) {
        navigate("/invoice", { state: data });
      }
    } catch (error) {
      console.log(error);
      setLoadingDetail(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const filteredTransactionHistory = selectedDate
    ? transactionHistory.filter(
        (transaction: any) =>
          new Date(transaction.date_of_sale).toLocaleDateString("en-CA") ===
          selectedDate
      )
    : transactionHistory;

  const formattedTransactionHistory = formatTransactionHistory(
    filteredTransactionHistory
  );

  return (
    <>
      <main className="transaction-history">
        <NavigationHeader
          title="Transaction Page"
          titleClassName="navigation-header-payment"
          NavigationHeaderImage={backIconImage}
          NavigationHeaderImageClassName="back-btn-image-icon"
          onClick={() => navigate(-1)}
        />

        <div className="filter-section">
          <div className="filter-label">
            <input
              className={`filter-by-date ${ Boolean(selectedDate) ? 'filter-by-date-filled' : 'filter-by-date-not-filled' }`}
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          {selectedDate && (
            <button className="clear-button" onClick={() => setSelectedDate("")}>
              Clear all filter
            </button>
          )}
        </div>

        <div className="transaction-history-container">
          {loading ? (
            <LoadingCircle />
          ) : formattedTransactionHistory.length > 0 ? (
            formattedTransactionHistory.map(
              (transactionGroup: any, index: number) => (
                <React.Fragment key={index}>
                  <DateSummary
                    date={transactionGroup.date}
                    totalAmount={transactionGroup.totalAmount}
                  />
                  {transactionGroup.items.map(
                    (transactionItem: any, itemIndex: number) => {
                      const sixDigit = transactionItem.transactionId;

                      return (
                        <TransactionCard
                          key={itemIndex}
                          amount={
                            !transactionItem.amount.includes("undefined")
                              ? transactionItem.amount
                              : "LKR NA"
                          }
                          time={transactionItem.time}
                          transactionId={sixDigit}
                          onClick={GetSaleById}
                        />
                      );
                    }
                  )}
                </React.Fragment>
              )
            )
          ) : (
            <p>No transaction history available.</p>
          )}
        </div>

        {loadingDetail && (
          <div className="loading-overlay">
            <LoadingCircle />
          </div>
        )}
      </main>
    </>
  );
}
