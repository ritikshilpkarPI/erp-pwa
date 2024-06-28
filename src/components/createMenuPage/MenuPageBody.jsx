import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";
import { AppStateContext, useAppContext } from "../../appState/appStateContext";
import LoadingCircle from "../loadinCircule/LoadingCircle";

const MenuPageBody = () => {
  const [itemList, setItemList] = useState([]);
  const { globalState, dispatch } = useAppContext(AppStateContext);
  const [loading, setLoading] = useState(false);
  console.log(loading);

  useEffect(() => {
    setItemList(globalState.items);
  }, [globalState.items]);

  useEffect(() => {
    setLoading(globalState.isLoading);
  }, [globalState.isLoading]);

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
