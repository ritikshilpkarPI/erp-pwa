import React, { useState } from "react";
import "./CreateMenuPage.css";
import SelectMenu from "../icons/SelectMenu";
import SelectStar from "../icons/SelectStar";
import SelectCalc from "../icons/SelectCalc";
import TotalBar from "./TotalBar";

const CreateBottomNav = () => {
  const [clickBtn, SetClickBtn] = useState(null);
  
  return (
    <div className="bottom-bar-outter">
      <TotalBar element={1} totalprize={200}/>
      <div className="create-bottom-nav">
        <SelectMenu onTap={() => SetClickBtn("btn1")} click={clickBtn} />
        <SelectStar onTap={() => SetClickBtn("btn2")} click={clickBtn} />
        <SelectCalc onTap={() => SetClickBtn("btn3")} click={clickBtn}/>
      </div>
    </div>
  );
};

export default CreateBottomNav;
