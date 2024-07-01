import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";
import { useAppContext } from "../../appState/appStateContext";
import LoadingCircle from "../loadinCircule/LoadingCircle";

const MenuPageBody = () => {
  const { globalState, dispatch } = useAppContext();
  const API = `${process.env.REACT_APP_SIGNUP_URL ?? 'http://localhost:5467/api/v1'}/items`;

  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [cartList, setCartList] = useState(globalState?.cartItems);

  useEffect(() => {
    fetch(API, {method: "POST"})
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: 'SET_ITEMS', payload: res });
        setItemList(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
        setLoading(false);
      });
  }, [API, dispatch]);

  const addItem = (itemID) => {
    let carItemsListCopy = [...cartList]
    const selectedItem = itemList.find(item => item._id === itemID);

    if (selectedItem) {
      const existingCartItem = cartList.find(cartItem => cartItem._id === itemID);
    
      if (existingCartItem) {

        carItemsListCopy = cartList.map(cartItem =>
          cartItem._id === itemID ? { ...cartItem, count: cartItem.count + 1 } : cartItem
        );
        setCartList(carItemsListCopy);
      } else {
        carItemsListCopy = [...cartList, { ...selectedItem, count: 1 }]
        setCartList(carItemsListCopy);
      }
    }

    dispatch({ type: 'ADD_ITEM_TO_CART', payload: carItemsListCopy });

  };

  return (
    <div className="menu-page-body">
      {loading ? (
        <LoadingCircle />
      ) : (
        globalState.items.map((item, index) => (
          <CreateListTile
            key={index}
            title={item.name}
            subtitle={item.sold_by}
            price={item.price_per_unit}
            onClick={() => addItem(item._id)}
          />
        ))
      )}
    </div>
  );
};

export default MenuPageBody;
