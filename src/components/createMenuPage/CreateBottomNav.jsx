import React, { useEffect, useState } from "react";
import "./CreateMenuPage.css";
import SelectMenu from "../../icons/SelectMenu";
import SelectStar from "../../icons/SelectStar";
import SelectCalc from "../../icons/SelectCalc";
import TotalBar from "./TotalBar";
import { useAppContext } from "../../appState/appStateContext";

const CreateBottomNav = () => {
  const { globalState } = useAppContext();
  const [clickBtn, setClickBtn] = useState("btn1"); // Updated to "btn1"

  const [elementLength, setElementLength] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);

  useEffect(() => {
    if (globalState && globalState?.cartItems) {
      setElementLength(globalState?.cartItems?.length);
      const total = globalState?.cartItems?.reduce(
        (sum, item) => sum + (item.price_per_unit || 0),
        0
      );
      setTotalPrize(total);
    }
  }, [globalState]);

  return (
    <div className="bottom-bar-outter">
      <TotalBar element={elementLength} totalprize={totalPrize.toFixed()} />
      <div className="create-bottom-nav">
        <SelectMenu onTap={() => setClickBtn("btn1")} click={clickBtn} label='Items' />
        <SelectStar onTap={() => setClickBtn("btn2")} click={clickBtn} label='Customer'/>
        <SelectCalc onTap={() => setClickBtn("btn3")} click={clickBtn} label='History' />
      </div>
    </div>
  );
};

export default CreateBottomNav;

