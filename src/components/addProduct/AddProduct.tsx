import React, { useState } from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, value, onChange, name }: any) => (
  <div className="input-container">
    <label className="input-label">{label}</label>
    <input className="input-field" type="text" value={value} onChange={onChange} name={name} />
  </div>
);

const PriceType = ({ type, price, onChange, checked }: any) => (
  <>
    <h3 className="price-type">{type}</h3>
    <div className="price-value">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {price}
    </div>
  </>
);

const DropdownField = ({ label, value, onChange, name, options }: any) => (
  <div className="input-container">
    <label className="input-label">{label}</label>
    <select className="input-field" value={value} onChange={onChange} name={name}>
      {options.map((option: string, index: number) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export const AddProduct = () => {
  const [formData, setFormData] = useState<any>({
    productName: "Wagyu",
    sellingPrice: "GNF 3420.99",
    priceTypes: [
      { type: "Dine-in", price: "GNF 420.99", checked: false },
      { type: "Takeaway", price: "GNF 420.99", checked: false },
      { type: "Delivery", price: "GNF 520.99", checked: false },
    ],
    categories: "Choose a category",
    capitalPrice: "GNF 3410.99",
    sku: "P6516484",
    barcode: "5646546",
    photo: null,
    photoPreview: null,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriceTypeChange = (index: number) => {
    const updatedPriceTypes = formData.priceTypes.map((item: any, i: any) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setFormData({ ...formData, priceTypes: updatedPriceTypes });
  };

  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file, photoPreview: URL.createObjectURL(file) });
  };

  const categoryOptions = ["Choose a category", "Category 1", "Category 2", "Category 3"];

  const navigate = useNavigate();

  return (
    <div className="product-page">
      <header className="header">
        <div className="header-content">
          <div className="add-product">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/415bbd33d4ef7c13cb8ce4d57ab932634d506a9087ec191dce9c4f20fab36a42?apiKey=d03ff6b018f84c75b88104249d2053b6&" alt="" className="add-icon" onClick={()=> navigate(-1)} />
            <h1 className="add-title">Add a product</h1>
          </div>
        </div>
      </header>
      <main className="main-content">
        <h2 className="section-title">Product details</h2>
        <InputField label="Product name" value={formData.productName} onChange={handleInputChange} name="productName" />
        <InputField label="Selling price" value={formData.sellingPrice} onChange={handleInputChange} name="sellingPrice" />
        <div className="price-type-toggle">
          <span className="toggle-label">Add a price type</span>
          <div className="toggle-switch">
            <div className="toggle-button" />
          </div>
        </div>
        <section className="price-types">
          {formData.priceTypes.map((item: any, index: any) => (
            <PriceType
              key={index}
              type={item.type}
              price={item.price}
              checked={item.checked}
              onChange={() => handlePriceTypeChange(index)}
            />
          ))}
        </section>
        <h2 className="section-title">More details (optional)</h2>
        <div className="photo-upload">
          <img src={formData.photoPreview || "https://cdn.builder.io/api/v1/image/assets/TEMP/4bb6243af55186b1cd1ebac4b200eeb8a7c4b4063d03380c52d037ffbcc583ca?apiKey=d03ff6b018f84c75b88104249d2053b6&"} alt="" className="upload-preview" />
          <label className="upload-button">
            Choose a photo
            <input type="file" onChange={handlePhotoChange} style={{ display: "none" }} />
          </label>
        </div>
        <DropdownField
          label="Categories"
          value={formData.categories}
          onChange={handleInputChange}
          name="categories"
          options={categoryOptions}
        />
        <InputField label="Capital price" value={formData.capitalPrice} onChange={handleInputChange} name="capitalPrice" />
        <InputField label="SKU (Stock Keeping Unit)" value={formData.sku} onChange={handleInputChange} name="sku" />
        <div className="barcode-input">
          <input type="text" value={formData.barcode} className="barcode-field" onChange={handleInputChange} name="barcode" readOnly />
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f49ceca8a5b8e0204a40b092222334f26b4eb227e997bea917064965e02deaf3?apiKey=d03ff6b018f84c75b88104249d2053b6&" alt="Scan barcode" className="barcode-icon" />
        </div>
        <button className="add-product-button">Add a new product</button>
        <button className="delete-product-button">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/302717b4ee4ab7d3462fc8605ada0ceaae8d5d7fbbd06287efa863058454024d?apiKey=d03ff6b018f84c75b88104249d2053b6&" alt="" className="delete-icon" />
          <span>Delete product</span>
        </button>
      </main>
    </div>
  );
};
