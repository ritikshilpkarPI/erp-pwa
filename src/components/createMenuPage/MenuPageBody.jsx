import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";

const MenuPageBody = () => {
  const [itemList, setItemList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/items");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItemList(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="menu-page-body">
      {/* <CreateListTile
        title={"sikh kabab"}
        subtitle={"nice product"}
        price={12.9}
      />
      <CreateListTile
        title={"sikh kabab"}
        subtitle={"nice product"}
        price={12.9}
      /> */}
      {itemList.map((index, item) => {
        return (
          <CreateListTile key={index}
            title={"sikh kabab"}
            subtitle={"nice product"}
            price={12.9}
          />
        );
      })}
    </div>
  );
};

export default MenuPageBody;
