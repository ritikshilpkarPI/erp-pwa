const NumberInput = ({ value, onChange, className, min = 0}) => {
    const handleChange = (event) => {
        let newValue = event.target.value;
        if (newValue === '' || parseFloat(newValue) >= min) {
            onChange(event);
        }
    };

    return (
        <input
            className={className}
            type="number"
            value={value === "" ? "" : value}
            onChange={(event) => handleChange(event)}
        />
    );
};

export default NumberInput;
