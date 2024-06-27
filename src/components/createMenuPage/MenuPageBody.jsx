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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="menu-page-body">
      {itemList.map((item, index) => {
        return (
          <CreateListTile
            key={index}
            title={item.name}
            subtitle={item.sold_by}
            price={item.price_per_unit}
          />
        );
      })}
    </div>
  );
};

export default MenuPageBody;
