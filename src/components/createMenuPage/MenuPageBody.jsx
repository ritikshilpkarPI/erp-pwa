import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";
import { AppStateContext, useAppContext } from "../../appState/appStateContext";
import LoadingCircle from "../loadinCircule/LoadingCircle";

const MenuPageBody = () => {
  const [itemList, setItemList] = useState([]);
  const { dispatch, globalState } = useAppContext(AppStateContext);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/items`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItemList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Handle the loading state even in case of an error
    }
  };

  useEffect(() => {
    fetchData();
    setItemList(globalState.items);
  }, [globalState.items]);

  const addItem = (index) => {
    const item = itemList[index];
    dispatch({ type: "ADD_ITEM_TO_CART", payload: item });
  };

  return (
    <div className="menu-page-body">
      {loading ? (
        <LoadingCircle />
      ) : (
        itemList.map((item, index) => (
          <CreateListTile
            key={index}
            title={item.name}
            subtitle={item.sold_by}
            price={item.price_per_unit}
            onClick={() => addItem(index)}
          />
        ))
      )}
    </div>
  );
};

export default MenuPageBody;
