import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import SelectMenu from "../../icons/SelectMenu";
import SelectStar from "../../icons/SelectStar";
import SelectCalc from "../../icons/SelectCalc";
import TotalBar from "./TotalBar";
import { useAppContext } from "../../appState/appStateContext";

const CreateBottomNav = () => {
  const { globalState } = useAppContext();
  const [clickBtn, SetClickBtn] = useState(null);

  const [elementLength, setElementLength] = useState(
    globalState.cartItems.length
  );
  const [totalPrize, setTotalPrize] = useState(0);

  useEffect(() => {
    setElementLength(globalState.cartItems.length);
    const total = globalState.cartItems.reduce(
      (sum, item) => sum + item.price_per_unit,
      0
    );
    setTotalPrize(total);
  }, [globalState.cartItems]);
  return (
    <div className="bottom-bar-outter">
      <TotalBar element={elementLength} totalprize={totalPrize.toFixed()} />
      <div className="create-bottom-nav">
        <SelectMenu onTap={() => SetClickBtn("btn1")} click={clickBtn} />
        <SelectStar onTap={() => SetClickBtn("btn2")} click={clickBtn} />
        <SelectCalc onTap={() => SetClickBtn("btn3")} click={clickBtn} />
      </div>
    </div>
  );
};

export default CreateBottomNav;
