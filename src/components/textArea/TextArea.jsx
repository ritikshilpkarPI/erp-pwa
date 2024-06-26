import React from "react";

const TextArea = (props) => {
  const { className, type, placeholder, labelTitle, value, onChange } = props;
  return (
    <div className="text-area-container">
      <label className={`${className}-label`} htmlFor={className}>
        {labelTitle}
      </label>
      <textarea
        className={className}
        id={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
