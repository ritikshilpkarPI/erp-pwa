import React from 'react';
import './ColorInput.css';
import Check from '../icons/Check';

const ColorInput = (props) => {
    const { color, colorSelectFunc, isSelected } = props;
    return (
        <div
            className='color-input'
            style={{ backgroundColor: color }}
            onClick={() => colorSelectFunc(color)}
        >
             {isSelected && <div className='color-input-overlay'>
                <Check/>
                </div>}
        </div>
    );
};

export default ColorInput;
