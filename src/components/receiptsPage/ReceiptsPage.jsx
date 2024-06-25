import  { useState } from "react";
import ReceiptsNavbar from "./ReceiptsNavbar";
import "./ReceiptsPage.css";
import ReceiptsTile from "./ReceiptsTile";
import SearchIcons from "../../icons/SearchIcons";

const ReceiptsPage = () => {
  const ReciptData = [
    {
      amount: "23000",
      time: "23.0",
      randomNum: "#0078",
    },
    {
      amount: "165000",
      time: "26.0",
      randomNum: "#06998",
    },
    {
      amount: "87000",
      time: "21.0",
      randomNum: "#2078",
    },
    {
      amount: "28980",
      time: "25.0",
      randomNum: "#6969",
    },
    {
      amount: "87000",
      time: "21.0",
      randomNum: "#2078",
    },
    {
      amount: "28980",
      time: "25.0",
      randomNum: "#6969",
    },
  ];
  const [reciptdata] = useState(ReciptData);
  return (
    <div>
      <ReceiptsNavbar />
      <div className="receipt-body">
        <div className="upper-search-bar">
          <SearchIcons />
          <input type="search" className="receipt-input" placeholder="Search" />
        </div>
        <div className="receipt-date-box"> Friday, 15 April 2022 </div>
        {reciptdata.map((e) => {
          return (
            <ReceiptsTile
              amount={e.amount}
              time={e.time}
              randomNum={e.randomNum}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReceiptsPage;
