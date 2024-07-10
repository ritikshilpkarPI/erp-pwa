import CashImage from "../../icons/CashImg";
import HistoryTransImg from "../../icons/HistoryTransImg";
import ShopImg from "../../icons/ShopImg";
import UserImg from "../../icons/UserImg";
import Category from "../../icons/Category";

const SideMenuItems = [
  { logo: <CashImage />, label: "Cashier", route: "" },
  {
    logo: <HistoryTransImg />,
    label: "Transaction History",
    route: "/history",
  },
  { logo: <ShopImg />, label: "Add Product", route: "/addproduct" },
  

  { logo: <UserImg />, label: "Customer List", route: "/customers" },
  
  { logo: <Category />, label: "Add Category", route: "/addCategory" },
];

export default SideMenuItems;