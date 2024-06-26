
import "./DropDown.css"
const DropDown = ({ options }) => {
  return (
    <div className="dropdown">
      <select className="select">
        {options.map((option, index) => (
          <option id="dropdown-options" key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;