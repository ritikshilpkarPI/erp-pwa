import React from "react";
import './ButtonInput.css';

const ButtonInput = (props) => {
  const { className, title, onClick, type, disable, isLoading = false } = props;

  return (
    <>
    
    <button disabled={disable} type={type} className={className} onClick={onClick}>
      
      {!isLoading ? title : <div className="spinner"></div>}
    </button>
    </>
  );
};

export default ButtonInput;
