import React from 'react';

const SelectInput = (props) => {
    const { name, className, values } = props;
    return (
        <select name={name} className={className}>
            <option value="">All items</option>
            {values.map((value, index) => (
                <option key={index} value={value}>{value}</option>
            ))}
        </select>
    );
};

export default SelectInput;
 