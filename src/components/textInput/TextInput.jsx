import React, { useState } from 'react';
import EyeIcon from '../../image/EyeIcon.svg';
import EyeOffIcon from '../../image/EyeOffIcon.svg';

const TextInput = (props) => {
    const { className, type, placeholder, labelTitle, value, onChange, accept, isPhoneNumber, isOtp, min } = props;
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
        setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    const handleChange = (e) => {
        if (isPhoneNumber && e.target.value.length > 10) {
            return;
        }
        if (isOtp && e.target.value.length > 6) {
            return
        }
        onChange(e);
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
                    onChange={handleChange}
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
                        min={min}
                        accept={accept}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={`${className}-toggle-button`}
                    >
                        {inputType === 'password' ? (<img src={EyeOffIcon} alt="Hide Password" />) :
                            (<img src={EyeIcon} alt="Show Password" />)}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TextInput;
