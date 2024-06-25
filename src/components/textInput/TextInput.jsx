import React from 'react';

const TextInput = (props) => {
    const { className, type, placeholder, labelTitle, value, onChange } = props;
    
    return (
        <div className='text-input-container'>
            <label className={`${className}-label`} htmlFor={className}>{labelTitle}</label>
            <input
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

export default TextInput;
