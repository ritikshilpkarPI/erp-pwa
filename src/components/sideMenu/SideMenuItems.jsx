import CashImage from "../../icons/CashImg";
import HistoryTransImg from "../../icons/HistoryTransImg";
import ShopImg from "../../icons/ShopImg";
import UserImg from "../../icons/UserImg";
import Category from "../../icons/Category";
import SquareChartGantt from "../../icons/SquareChartGantt";

const SideMenuItems = [
  { logo: <CashImage />, label: "Cashier", route: "" },
  {
    logo: <HistoryTransImg />,
    label: "Transaction History",
    route: "/history",
  },
  { logo: <ShopImg />, label: "Add Product", route: "/addproduct" },


  { logo: <UserImg />, label: "Customer List", route: "/customers" },

  { logo: <Category />, label: "Category list", route: "/category" },
  { logo: <SquareChartGantt />, label: "Policy", route: "/policy" },
];


export default SideMenuItems;