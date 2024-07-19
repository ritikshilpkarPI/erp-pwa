import React, { useState } from 'react'
import './NavigationFooter.css';
import SelectMenu from "../../icons/SelectMenu";
import SelectStar from "../../icons/SelectStar";
import SelectCalc from "../../icons/SelectCalc";

const NavigationFooter = () => {
    const [clickBtn, setClickBtn] = useState("btn1");
  return (
    <div className="navigation-footer-container">
    
      <SelectMenu onTap={() => setClickBtn("btn1")} click={clickBtn} label='Items' />
      <SelectStar onTap={() => setClickBtn("btn2")} click={clickBtn} label='Customer'/>
      <SelectCalc onTap={() => setClickBtn("btn3")} click={clickBtn} label='History' />
  </div>
  )
}

export default NavigationFooter