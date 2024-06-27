import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";
import {AppStateContext, useAppContext } from "../../appState/appStateContext";

const MenuPageBody = () => {
  const [itemList, setItemList] = useState([]);
  const {dispatch}= useAppContext(AppStateContext);

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

  const addItem = (index) => {
    const item = itemList[index];
    dispatch({ type: 'ADD_ITEM_TO_CART', payload: item });
  }

  return (
    <div className="menu-page-body">
      {itemList.map((item, index) => {
        return (
          <CreateListTile
            key={index}
            title={item.name}
            subtitle={item.sold_by}
            price={item.price_per_unit}
            onClick={() => addItem(index)}
          />
        );
      })}
    </div>
  );
};

export default MenuPageBody;
