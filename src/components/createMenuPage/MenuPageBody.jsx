import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";
import { AppStateContext, useAppContext } from "../../appState/appStateContext";
import LoadingCircle from "../loadinCircule/LoadingCircle";

const MenuPageBody = () => {
  const [itemList, setItemList] = useState([]);
  const { globalState, dispatch } = useAppContext(AppStateContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItemList(globalState.items);
    setLoading(!Boolean(globalState.items));

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
        Boolean(itemList?.length) && itemList?.map((item, index) => (
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
