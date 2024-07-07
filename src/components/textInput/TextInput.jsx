import React, { useState } from 'react';
import EyeIcon from '../../image/EyeIcon.svg'
import EyeOffIcon from '../../image/EyeOffIcon.svg'


const TextInput = (props) => {
    const { className, type, placeholder, labelTitle, value, onChange, accept } = props;
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
        setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    return (
        <div className='text-input-container'>
            <label className={`${className}-label`} htmlFor={className}>{labelTitle}</label>
            {type !== 'password' ? (
                <input
                    className={className}
                    id={className}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    accept={accept}
                />
            ) : (
                <div className={`${className}-container`}>
                    <input
                        className={className}
                        id={className}
                        type={inputType}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={`${className}-toggle-button`}
                    >
                        {inputType === 'password' ? (<img src={EyeIcon} alt="" />) :
                            (<img src={EyeOffIcon} alt="" />)}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TextInput;
