import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";
import { useAppContext } from "../../appState/appStateContext";
import LoadingCircle from "../loadinCircule/LoadingCircle";

const MenuPageBody = () => {
  const { globalState, dispatch } = useAppContext();
  const [cartList, setCartList] = useState(globalState.cartItems);

  useEffect(() => {
    setCartList(globalState.cartItems);
  }, [globalState.cartItems]);

  const addItem = (itemID) => {
    const selectedItem = globalState.items.find((item) => item._id === itemID);
    if (selectedItem) {
      const existingCartItem = cartList.find((cartItem) => cartItem._id === itemID);
      let carItemsListCopy;
      if (existingCartItem) {
        carItemsListCopy = cartList.map((cartItem) =>
          cartItem._id === itemID ? { ...cartItem, count: cartItem.count + 1 } : cartItem
        );
      } else {
        carItemsListCopy = [...cartList, { ...selectedItem, count: 1 }];
      }
      setCartList(carItemsListCopy);
      dispatch({ type: "ADD_ITEM_TO_CART", payload: carItemsListCopy });
    }
  };

  const incrementItem = (itemID) => {
    const carItemsListCopy = cartList.map((cartItem) =>
      cartItem._id === itemID ? { ...cartItem, count: cartItem.count + 1 } : cartItem
    );
    setCartList(carItemsListCopy);
    dispatch({ type: "ADD_ITEM_TO_CART", payload: carItemsListCopy });
  };

  const decrementItem = (itemID) => {
    const carItemsListCopy = cartList
      .map((cartItem) =>
        cartItem._id === itemID ? { ...cartItem, count: cartItem.count - 1 } : cartItem
      )
      .filter((cartItem) => cartItem.count > 0);
    setCartList(carItemsListCopy);
    dispatch({ type: "ADD_ITEM_TO_CART", payload: carItemsListCopy });
  };

  return (
    <div className="menu-page-body">
      {globalState.isLoading ? (
        <LoadingCircle />
      ) : (
        globalState.items.map((item) => (
          <CreateListTile
            key={item._id}
            title={item.name}
            subtitle={item.sold_by}
            price={item.price_per_unit}
            count={cartList.find(cartItem => cartItem._id === item._id)?.count || 0}
            onAdd={() => addItem(item._id)}
            onIncrement={() => incrementItem(item._id)}
            onDecrement={() => decrementItem(item._id)}
          />
        ))
      )}
    </div>
  );
};

export default MenuPageBody;
