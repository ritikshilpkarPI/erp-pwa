import CashImage from "../../icons/CashImg";
import HistoryTransImg from "../../icons/HistoryTransImg";
import ReportImg from "../../icons/ReportImg";
import ShopImg from "../../icons/ShopImg";
import UserImg from "../../icons/UserImg";
// import SupportImg from "../../icons/SupportImg";
import SupportImg from "../../icons/SupportImg"

const SideMenuItems = [
  { logo: <CashImage />, label: "Cashier", route: "" },
  {
    logo: <HistoryTransImg />,
    label: "Transaction History",
    route: "/history",
  },
  { logo: <ReportImg />, label: "Rapport", route: "" },
  { logo: <ShopImg />, label: "Manage the Store", route: "" },

  { logo: <UserImg />, label: "Compete", route: "" },
  { logo: <SupportImg />, label: "Support", route: "" },
];

export default SideMenuItems;