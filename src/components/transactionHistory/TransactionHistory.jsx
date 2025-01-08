import React, { useContext, useEffect, useState } from "react";
import "./TransactionHistory.css";
import { useNavigate } from "react-router-dom";
import { AppStateContext } from "../../appState/appStateContext";
import LoadingCircle from "../loadinCircule/LoadingCircle";
import backIconImage from "../../image/BackIcon.svg";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import { TabSwitch } from "../tabSwitch/TabSwitch";

const TransactionCard = ({
  amount,
  time,
  transactionId,
  customerName,
  onClick,
  remainingAmount = 0,
  onDuePayment,
}) => (
  <article className="transaction-card" onClick={() => onClick()}>
    <div className="transaction-details">
      <div className="transaction-amount">{amount}</div>
      <div className="transaction-info">{time}</div>
      <div className="transaction-info">Customer:- {customerName}</div>
      {remainingAmount !== 0 && (
        <div className="transaction-info remaining-amount-text">
          Remaining Payment:- {remainingAmount.toFixed(2)}
        </div>
      )}
      <div className="transaction-info">
        Trans Id - {transactionId.slice(-6)}
      </div>
    </div>
    {remainingAmount !== 0 
      ? <button
        onClick={(event) => {
          event.stopPropagation()
          onDuePayment()
        }
        }
        className="status-badge-button"
      >
        Pay Due Payment
      </button>
      :<div className="status-badge">{ "PAID" }</div>
    }
  </article>
);

const DateSummary = ({ date, totalAmount }) => (
  <section className="date-summary">
    <div className="date">{date}</div>
    <div className="total-amount">{totalAmount}</div>
  </section>
);
const TransactionGroup = ({ transactionGroup, onGetSaleById }) => {
  const handleOnClick = (transactionItem)=>{    
    onGetSaleById(transactionItem.transactionId);
  }
  const onDuePayment = (transactionItem)=>{    
    onGetSaleById(transactionItem.transactionId, true);
  }

  return (
    <React.Fragment>
      <DateSummary
        date={transactionGroup.date}
        totalAmount={transactionGroup.totalAmount}
      />
      {transactionGroup.items.map((transactionItem, itemIndex) => {
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
            onClick={()=> handleOnClick(transactionItem)}
            customerName={transactionItem.customerName}
            remainingAmount={transactionItem?.remainingAmount || 0}
            onDuePayment={()=>onDuePayment(transactionItem)}
          />
        );
      })}
    </React.Fragment>
  );
};

export function TransactionHistory() {
  const navigate = useNavigate();
  const { globalState, dispatch } = useContext(AppStateContext);
  const API = `${
    process.env.REACT_APP_BASE_URL || "http://localhost:5467/api/v1"
  }/sales`;
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [activeTab, setActiveTab] = useState("UNPAID");
  const [formattedTransactionHistory, setFormattedTransactionHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
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

  const formatTransactionHistory = (data) => {
    const sortedData = data.sort(
      (a, b) =>
        new Date(b?.date_of_sale).getTime() - new Date(a?.date_of_sale).getTime()
    );

    const groupedTransactions = sortedData.reduce((acc, transaction) => {
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
        customerName: transaction?.customer_id?.name || "Unknown",
        remainingAmount: transaction?.remainingAmount,
      });

      return acc;
    }, {});

    return Object.entries(groupedTransactions).map(([date, { totalAmount, items }]) => ({
      date,
      totalAmount: `LKR ${totalAmount?.toFixed(2)}`,
      items,
    }));
  };

  const filterData = (formattedTransactionHistory, filterType) => {
    return formattedTransactionHistory
      .map((transaction) => {
        const filteredItems =
          filterType === "PAID"
            ? transaction.items.filter((item) => item.remainingAmount === 0)
            : filterType === "UNPAID"
            ? transaction.items.filter((item) => item.remainingAmount > 0)
            : transaction.items;

        return {
          ...transaction,
          items: filteredItems,
        };
      })
      .filter((transaction) => transaction.items.length > 0);
  };

  const GetSaleById = async (id, isDue= false) => {
    try {
      const token = localStorage.getItem("token");
      setLoadingDetail(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/transaction-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
          credentials: "include",
        }
      );
      const data = await response.json();
      setLoadingDetail(false);
      if (response.ok) {        
        isDue 
        ? navigate("/payment", { state: data })
        : navigate("/invoice", { state: data })
      }
    } catch (error) {
      console.log(error);
      setLoadingDetail(false);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredTransactionHistory = selectedDate
    ? transactionHistory.filter(
        (transaction) =>
          new Date(transaction.date_of_sale).toLocaleDateString("en-CA") ===
          selectedDate
      )
    : transactionHistory;

  useEffect(() => {
    const formattedTransaction = formatTransactionHistory(filteredTransactionHistory);
    const transFilter = filterData(formattedTransaction || [], activeTab);
    setFormattedTransactionHistory(transFilter);
    // eslint-disable-next-line
  }, [filteredTransactionHistory]);

  useEffect(() => {
    const formattedTransaction = formatTransactionHistory(filteredTransactionHistory);
    const transFilter = filterData(formattedTransaction || [], activeTab);
    setFormattedTransactionHistory(transFilter);
    // eslint-disable-next-line
  }, [activeTab]);

  return (
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
            className={`filter-by-date ${
              Boolean(selectedDate) ? "filter-by-date-filled" : "filter-by-date-not-filled"
            }`}
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
      <TabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="transaction-history-container">
        {loading ? (
          <LoadingCircle />
        ) : formattedTransactionHistory.length > 0 ? (
          formattedTransactionHistory.map((transactionGroup, index) => (
            <TransactionGroup
              key={index}
              transactionGroup={transactionGroup}
              onGetSaleById={GetSaleById}
            />
          ))
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
  );
}
