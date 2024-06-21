import React from 'react';

const ButtonInput = (props) => {
  const { title, className } = props;
//   console.log(className)

  return (
    <button className={className}>
      {title}
    </button>
  );
};

export default ButtonInput;
