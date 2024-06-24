import  { useState } from 'react';
import './CreateCategory.css';
import ArrowLeft from '../icons/ArrowLeft';
import ColorInput from '../colorInput/ColorInput';
import ButtonInput from '../buttonInput/ButtonInput';


const CreateCategory = () => {
  const colorList = [
    'red',
    'pink',
    'orange',
    'yellow',
    'green',
    'blue',
    'gray',
    'purple',
  ];
  
  const [addCategory, setAddCategory] = useState('');
  const [addColor, setAddColor] = useState('');

  const inputCategory = (event) => {
    setAddCategory(event.target.value);
  };

  const colorSelectFunc = (color) => {
    setAddColor(color);
  };

  const saveFun = () => {
    if (addCategory.length > 0 && addColor.length > 0) {
    } else {
    }
  };

  return (
    <div className="create-category-container">
      <div className="create-category-nav">
        <div className="nav-left">
          <ArrowLeft />
          <h3 className="nav-left-title">Create Category</h3>
        </div>
        <div className="nav-right">
          <h3 className="nav-right-save-title" onClick={saveFun}>
            Save
          </h3>
        </div>
      </div>

      <div className="input-container">
        <input
          className="category-name-input"
          type="text"
          placeholder="Category Name"
          onChange={inputCategory}
          value={addCategory}
        />
      </div>

      <div className="category-color-container">
        <h3 className="color-title">Category color</h3>
        <div className="color-input-container">
          {colorList.map((color, index) => (
            <ColorInput
              key={index}
              color={color}
              isSelected={color === addColor}
              colorSelectFunc={colorSelectFunc}
            />
          ))}
        </div>
      </div>

      <div className="button-container">
        <ButtonInput title="ASSIGN ITEM" className="assign-item-button" />
        <ButtonInput title="CREATE ITEM" className="create-item-button" />
      </div>
    </div>
  );
};

export default CreateCategory;
