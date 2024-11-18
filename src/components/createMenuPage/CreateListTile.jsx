import React, { useState } from "react";
import "./CreateMenuPage.css";
import AddIcon from "../../icons/AddIcon";
import MinusIcon from "../../icons/MinusIcon";
import { useAppContext } from "../../appState/appStateContext";

const CreateListTile = ({
  title,
  subtitle,
  price,
  price_per_unit,
  price_per_dozen,
  price_per_carton,
  onClick,
  count,
  onAdd,
  onDecrement,
  onIncrement,
  img,
}) => {
  const [priceCategory, setPriceCategory] = useState("price_per_unit");

  const { dispatch } = useAppContext();

  const selectHandler = (event) => {
    setPriceCategory(event.target.value);
    dispatch({ type: "PRICING_PER_QUANTITY", payload: priceCategory });
  };

  const getPrice = () => {
    switch (priceCategory) {
      case "price_per_unit":
        return price_per_unit;
      case "price_per_dozen":
        return price_per_dozen;
      case "price_per_carton":
        return price_per_carton;
      default:
        return price;
    }
  };

  return (
    <div className="create-list-tile">
      <div className="list-tile-outter">
        <img
          src={
            img ??
            "https://s3-alpha-sig.figma.com/img/72cc/0d24/b3ddb149821c66f6653d911096c913f5?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DjoJGD-hfCJXM0yeFvFqQP~XC0vpr4TFVU1hHh3So9quVXP~4M79-H~N96A7fD40Srx6gJqBLJNjsfEPecDsoLf-vfk2Qz2TfFBZYP7NOppzXdE1rxYzNudVhE5YhHLkXMtokGIV718xVjeZ7nQO5CWZj-Qw4zLHIByXzmNloWWXIYMVpv~5J3UQyY5wXTGXrK2aOuuN99BBJvCvPtaIuakpK55yKIo7ZW74Wzbj0f2HRaBhzLi2Iwl0BT99RALOevgo3p45CjBLZIdG19scThTL~aINCZADvO5j27JsY35WUOHfpvgzMhWg8XjTIZGfj3tOpmUxdOE0L6C~X7v-dQ__"
          }
          alt=""
        />
        <div className="tile-content">
          <h3 className="tile-content-title">{title}</h3>
          <select onChange={selectHandler} className="select-dropdown">
            <option defaultValue={price_per_unit} value="price_per_unit">
              Unit
            </option>
            <option value="price_per_dozen">Dozen</option>
            <option value="price_per_carton">Carton</option>
          </select>
          <h3 className="tile-content-price">රු {getPrice()}</h3>
        </div>
      </div>
      <div className="tile-traling">
        {count > 0 ? (
          <>
            <span className="tile-minus-btn">
              <MinusIcon onClick={() => onDecrement()} />
            </span>
            <div className="count">{count}</div>
            <AddIcon
              className="tile-add--btn"
              onClick={() => onIncrement(getPrice())}
            />
          </>
        ) : (
          <AddIcon onClick={onAdd} />
        )}
      </div>
    </div>
  );
};

export default CreateListTile;
