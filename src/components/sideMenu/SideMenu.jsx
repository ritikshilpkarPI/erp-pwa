import { useState } from "react";
import "./SideMenu.css";
import SideBarLogo from "../../icons/SideBarLogo";
import ButtonInput from "../buttonInput/ButtonInput";
import DropDown from "../dropDown/DropDown";
import SideMenuItems from "./SideMenuItems";
import EllipseIcon from "../../icons/EllipseIcon";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../appState/appStateContext";

const SideMenu = () => {
  const { globalState, dispatch } = useAppContext();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const toggleOpen = () => {
    dispatch({ type: 'TOGGLE_DRAWER' });
  };

  const navigate = useNavigate();

  const handleItemClick = (route, index) => {
    navigate(route);
    setSelectedIndex(index);
    dispatch({ type: 'TOGGLE_DRAWER' });
  };

  return (
    <div className={`sidemenu-main-overlay ${globalState.isOpen ? 'open' : ''}`}>
      <div className={`sidemenu-main ${globalState.isOpen ? 'open' : ''}}`}>
        <div className="side-menu">
          <div className="sidemenu-header">
            <div className="logo-app-name">
              <div className="logo">
                <SideBarLogo />
              </div>
              <div className="app-name">{"AppName"}</div>
            </div>
            <div className="sidemenu-header-button">
              <ButtonInput className="sidemenu-header-btn" title="Lite" />
            </div>
          </div>
          <div className="user-name">{"Nitin"}</div>
          <DropDown options={options} />
          <div className="line"></div>
          <div className="sidemenu-items">
            {SideMenuItems.map((item, index) => (
              <div
                className={`item ${index === selectedIndex ? 'selected' : ''}`}
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
          <div className="login-history">
            <div className="ellipse-icon">
              <EllipseIcon />
            </div>
            <div className="content">
              <p>Dernière Connexion</p>
              <p>Lundi, 01 juillet 2020</p>
              <p>(12:00 AM)</p>
            </div>
          </div>
        </div>
        <div className="sidemenu-footer-btn">
          <ButtonInput
            className="sidemenu-footer-button"
            title="UPGRADE TO PREMIUM"
          />
        </div>
      </div>
      <div className="overlay" onClick={toggleOpen}></div>
    </div>
  );
};

export default SideMenu;
