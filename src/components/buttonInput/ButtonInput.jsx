import React from "react";

const ButtonInput = (props) => {
  const { className, title, onClick, type, disable } = props;

  return (
    <button disabled={disable} type={type} className={className} onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonInput;
