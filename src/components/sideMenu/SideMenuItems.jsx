import CashImage from "../../icons/CashImg";
import HistoryTransImg from "../../icons/HistoryTransImg";
import ReportImg from "../../icons/ReportImg";
import ShopImg from "../../icons/ShopImg";
import UserImg from "../../icons/UserImg";
import SupportImg from "../../icons/SupportImg"
import Category from "../../icons/Category";

const SideMenuItems = [
  { logo: <CashImage />, label: "Cashier", route: "" },
  {
    logo: <HistoryTransImg />,
    label: "Transaction History",
    route: "/history",
  },
  { logo: <ShopImg />, label: "Add Product", route: "/addproduct" },
  { logo: <ReportImg />, label: "Manage the Store", route: "" },

  { logo: <UserImg />, label: "Customer List", route: "/customers" },
  { logo: <SupportImg />, label: "Support", route: "" },
  { logo: <Category />, label: "Add Category", route: "/addCategory" },
];

export default SideMenuItems;