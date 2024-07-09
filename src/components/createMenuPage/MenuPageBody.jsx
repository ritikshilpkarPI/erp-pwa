import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import CreateListTile from "./CreateListTile";
import { useAppContext } from "../../appState/appStateContext";
import LoadingCircle from "../loadinCircule/LoadingCircle";
import { Player } from "@lottiefiles/react-lottie-player";
import noDataAnimation from "../../animation/noDataAnimation.json";

const MenuPageBody = () => {
  const { globalState, dispatch } = useAppContext();
  const [cartList, setCartList] = useState(globalState.cartItems);
  const [showNoDataAnimation, setShowNoDataAnimation] = useState(false);

  useEffect(() => {
    setCartList(globalState.cartItems);

    const delayTimeout = setTimeout(() => {
      if (globalState.items.length === 0) {
        setShowNoDataAnimation(true);
      }
    }, 2 * 30);

    return () => clearTimeout(delayTimeout);
  }, [globalState.cartItems, globalState.items.length]);

  const addItem = (itemID) => {
    const selectedItem = globalState.items.find((item) => item._id === itemID);
    if (selectedItem) {
      const existingCartItem = cartList.find(
        (cartItem) => cartItem._id === itemID
      );
      let carItemsListCopy;
      if (existingCartItem) {
        carItemsListCopy = cartList.map((cartItem) =>
          cartItem._id === itemID
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
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
      cartItem._id === itemID
        ? { ...cartItem, count: cartItem.count + 1 }
        : cartItem
    );
    setCartList(carItemsListCopy);
    dispatch({ type: "ADD_ITEM_TO_CART", payload: carItemsListCopy });
  };

  const decrementItem = (itemID) => {
    const carItemsListCopy = cartList
      .map((cartItem) =>
        cartItem._id === itemID
          ? { ...cartItem, count: cartItem.count - 1 }
          : cartItem
      )
      .filter((cartItem) => cartItem.count > 0);
    setCartList(carItemsListCopy);
    dispatch({ type: "ADD_ITEM_TO_CART", payload: carItemsListCopy });
  };

  return (
    <div className="menu-page-body">
      {globalState.isLoading ? (
        <LoadingCircle />
      ) : globalState.items.length > 0 ? (
        globalState.items.map((item) => {
          
          return (
            <CreateListTile
              key={item._id}
              title={item.name}
              subtitle={item.sold_by}
              price={item.price_per_unit}
              count={
                cartList.find((cartItem) => cartItem._id === item._id)?.count ||
                0
              }
              onAdd={() => addItem(item._id)}
              onIncrement={() => incrementItem(item._id)}
              onDecrement={() => decrementItem(item._id)}
              img={item["img_url"]}
            />
          );
        })
      ) : showNoDataAnimation ? (
        <div className="no-data-animation">
          <Player
            autoplay
            loop
            src={noDataAnimation}
            style={{
              height: "300px",
              width: "300px",
              position: "absolute",
              top: "50%",
              left: "50%",

              transform: "translate(-50%, -50%)",
            }}
          />
          <p>No data</p>
        </div>
      ) : null}
    </div>
  );
};

export default MenuPageBody;
