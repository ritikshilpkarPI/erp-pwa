import CashImage from "../../icons/CashImg";
import HistoryTransImg from "../../icons/HistoryTransImg";
import ReportImg from "../../icons/ReportImg";
import ShopImg from "../../icons/ShopImg";
import UserImg from "../../icons/UserImg";
// import SupportImg from "../../icons/SupportImg";
import SupportImg from "../../icons/SupportImg"

const SideMenuItems = [
  { logo: <CashImage />, label: "Caissier", route: "/cash" },
  {
    logo: <HistoryTransImg />,
    label: "Historique Transaction",
    route: "/history",
  },
  { logo: <ReportImg />, label: "Rapport", route: "/report" },
  { logo: <ShopImg />, label: "Gerer le magasin", route: "/store" },

  { logo: <UserImg />, label: "Compete", route: "/compete" },
  { logo: <SupportImg />, label: "Soutien", route: "/support" },
];

export default SideMenuItems;