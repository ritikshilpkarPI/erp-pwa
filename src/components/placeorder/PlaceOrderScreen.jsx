import React, { useContext, useEffect, useMemo, useState } from "react";
import "./PlaceOrderScreen.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AppStateContext } from "../../appState/appStateContext";
import DeleteIcon from "../../icons/DeleteIcon";

const PlaceOrderScreen = () => {
  const { globalState, dispatch } = useContext(AppStateContext);
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    setCartList(globalState?.cartItems || []);
  }, [globalState?.cartItems]);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickCustomer = () => {
    navigate("/customers");
  };

  const handleClickPayment = () => {
    navigate("/payment");
  };

  const [btnClicked, setBtnClicked] = useState("take");

  const totalPrice = useMemo(() => {
    return cartList
      .reduce((total, item) => total + item.prize * item.count, 0)
      .toFixed(2);
  }, [cartList]);

  const handlePriceChange = (index, newPrice) => {
    const updatedCartItems = cartList.map((item, i) => {
      const price = newPrice === "" ? "" : parseFloat(newPrice);
      return i === index ? { ...item, prize: price } : item;
    });
    setCartList(updatedCartItems);
    dispatch({ type: "UPDATE_CART_ITEMS", payload: updatedCartItems });
  };

  useEffect(() => {
    console.log(cartList);
  }, [cartList]);

  return (
    <div className="placeorder-screen-container">
      <div className="placeorder-head">
        <RiArrowLeftSLine
          className="arrow-icon icon"
          onClick={handleClickBack}
        />
        <h1 className="placeorder-heading">Order Details</h1>
      </div>
      <hr />
      <div className="placeorder-head-bottom">
        <h1 className="placeorder-head-bottom-heading">
          {globalState.selectedCustomer?.name || "Customer"}
        </h1>
        <RiArrowRightSLine
          className="arrow-icon icon2"
          onClick={handleClickCustomer}
        />
      </div>
      <div className="placeorder-buttons">
        <button
          onClick={() => {
            setBtnClicked("take");
          }}
          className={btnClicked === "take" ? "btnclick1" : "btnclick"}
        >
          Take-away
        </button>
        <button
          onClick={() => {
            setBtnClicked("del");
          }}
          className={btnClicked === "del" ? "btnclick1" : "btnclick"}
        >
          Delivery
        </button>
        <button
          onClick={() => {
            setBtnClicked("eat");
          }}
          className={btnClicked === "eat" ? "btnclick1" : "btnclick"}
        >
          Eat-in
        </button>
      </div>
      <div className="placeorder-content">
        <div className="placeorder-list-content">
          {cartList.map((cartItem, index) => (
            <div className="placeorder-content-div" key={index}>
              <button>{cartItem.count}</button>
              <div className="placeorder-menu">
                <h5>

                {cartItem.name}
                </h5>
                <p>

                {cartItem.sold_by}
                </p>
                </div>
              <div className="placeorder-price">
                <div className="placeorder-input-box">
                  <h5 className="placeorder-input-box-heading">රු</h5>
                  <input
                    className="placeorder-input-box-input"
                    type="number"
                    value={cartItem.prize === "" ? "" : cartItem.prize}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
       
        <div className="placeorder-total">
          <h1>Subtotal</h1>
          <h1>රු {totalPrice}</h1>
        </div>
        <div
          className="placeorder-delete"
          onClick={() => {
            dispatch({ type: "ADD_ITEM_TO_CART", payload: [] });
            navigate("/landing");
          }}
        >
          <DeleteIcon />
          <p>Empty Cart</p>
        </div>
      </div>
      <div className="placeorder-bottom">
        <div className="placeorder-total">
          <h1>Subtotal</h1>
          <h1>රු{totalPrice}</h1>
        </div>
        <div className="placeorder-bottom-button" onClick={handleClickPayment}>
          Place an order
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
