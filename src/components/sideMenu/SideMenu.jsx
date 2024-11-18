import { useState } from "react";
import "./SideMenu.css";
import SideBarLogo from "../../icons/SideBarLogo";
import ButtonInput from "../buttonInput/ButtonInput";
import SideMenuItems from "./SideMenuItems";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../appState/appStateContext";

const SideMenu = () => {
  const { globalState, dispatch } = useAppContext();
  const [selectedIndex, setSelectedIndex] = useState(null);


  const toggleOpen = () => {
    dispatch({ type: "TOGGLE_DRAWER" });
  };

  const navigate = useNavigate();

  const handleItemClick = (route, index) => {
    navigate(route);
    setSelectedIndex(index);
    dispatch({ type: "TOGGLE_DRAWER" });
  };

  return (
    <div
      className={`sidemenu-main-overlay ${globalState.isOpen ? "open" : ""}`}
    >
      <div className={`sidemenu-main `}>
        <div className="side-menu">
          <div className="sidemenu-header">
            <div className="logo-app-name">
              <div className="logo">
                <SideBarLogo />
              </div>
              <div className="app-name">{"Invoicify"}</div>
            </div>
            <div className="sidemenu-header-button">
              
            </div>
          </div>
          <div className="user-name">
            {" Hey 👋   "} {"   "}
            <span className="user-name-text">{globalState?.loggedInUser?.user?.name ?? "User"}</span>
          </div>
          <span className="user-name-text device-name-text">{globalState?.loggedInUser?.user?.deviceName ?? ""}</span>
          {/* <DropDown options={options} /> */}
          <div className="line"></div>
          <div className="sidemenu-items">
            {SideMenuItems.map((item, index) => (
              <div
                className={`item ${index === selectedIndex ? "selected" : ""}`}
                key={index}
                onClick={() => handleItemClick(item.route, index)}
                role="button"
                tabIndex="0"
              >
                <div className="item-logo">{item.logo}</div>
                <div className="item-label">{item.label}</div>
              </div>
            ))}
          </div>
          {/* <div className="login-history">
            
            <div className="content">
              <p>Last Login</p>
              <p>Monday, July 1, 2020</p>
              <p>(12:00 AM)</p>
            </div>
          </div> */}
        </div>
        <div className="sidemenu-footer-btn">
          <ButtonInput
                className="sidemenu-header-btn sidemenu-footer-button"
                title="Log out"
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                  navigate("/login");
                }}
                type="button"
              />
        </div>
      </div>
      <div className="overlay" onClick={toggleOpen}></div>
    </div>
  );
};

export default SideMenu;
