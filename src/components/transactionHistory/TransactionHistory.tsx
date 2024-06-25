import React from "react";
import "./TransactionHistory.css"

const TransactionCard = ({ amount, time, transactionId }: any) => (
  <article className="transaction-card">
    <div className="transaction-details">
      <div className="transaction-amount">{amount}</div>
      <div className="transaction-info">{`${time} - #${transactionId}`}</div>
    </div>
    <div className="status-badge">PAID</div>
  </article>
);

const DateSummary = ({ date, totalAmount }: any) => (
  <section className="date-summary">
    <div className="date">{date}</div>
    <div className="total-amount">{totalAmount}</div>
  </section>
);

export function TransactionHistory() {
  const transactions = [
    { date: "Sunday, August 2, 2020", totalAmount: "INR 2390.99", items: [
      { amount: "INR 320.99", time: "10.00 AM", transactionId: "TRX0101211113" },
      { amount: "INR 520.99", time: "05.00 PM", transactionId: "TRX0101211113" },
      { amount: "INR 420.99", time: "09.00 PM", transactionId: "TRX0101211113" },
    ]},
    { date: "Saturday, August 3, 2020", totalAmount: "INR 1190.99", items: [
      { amount: "INR 120.99", time: "11.00 AM", transactionId: "TRX0101211113" },
      { amount: "INR 520.99", time: "10.00 AM", transactionId: "TRX0101211113" },
      { amount: "INR 620.99", time: "08.00 AM", transactionId: "TRX0101211113" },
    ]},
  ];

  return (
    <>
      <main className="transaction-history">
        <header className="header">
          <h1 className="title">Transaction History</h1>
          <div className="filter-section">
            <div className="filter-label">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e1014186ee482b9f7f7ef6a523f6f756981b0dc6bd24b1364ee7b877e96ba36?apiKey=d03ff6b018f84c75b88104249d2053b6&" className="filter-icon" alt="" />
              <div className="filter-text">Date and Time of Filter</div>
            </div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/202f00e4a88f1f8cb63723f2ab74511e60aaa75360a6b04f24fbef81723b5813?apiKey=d03ff6b018f84c75b88104249d2053b6&" className="filter-arrow" alt="" />
          </div>
        </header>
        {transactions.map((group, index) => (
          <React.Fragment key={index}>
            <DateSummary date={group.date} totalAmount={group.totalAmount} />
            {group.items.map((item, itemIndex) => (
              <TransactionCard
                key={itemIndex}
                amount={item.amount}
                time={item.time}
                transactionId={item.transactionId}
              />
            ))}
          </React.Fragment>
        ))}
      </main>
    </>
  );
}
