import React from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";

const MenuPageBody = () => {
  return (
    <div className="menu-page-body">
      <CreateListTile
        title={"sikh kabab"}
        subtitle={"nice product"}
        price={12.9}
      />
      <CreateListTile
        title={"sikh kabab"}
        subtitle={"nice product"}
        price={12.9}
      />
    </div>
  );
};

export default MenuPageBody;
