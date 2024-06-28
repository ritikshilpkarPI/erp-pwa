import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";
import { AppStateContext, useAppContext } from "../../appState/appStateContext";

const MenuPageBody = () => {
  const { globalState, dispatch } = useAppContext(AppStateContext);
  const [itemList, setItemList] = useState(globalState.items);

  useEffect(() => {
    setItemList(globalState.items);
  }, [globalState.items]);

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
