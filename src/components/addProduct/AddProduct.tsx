import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIcon from "../../image/BackIcon.svg";
import TextInput from "../textInput/TextInput";
import "../addProduct/AddProduct.css";

interface FormData {
  categories: string;
  capitalPrice: string;
  sku: string;
  barcode: string;
  photo: File | null;
  photoPreview: string | null;
}

export const AddProduct = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");
  const [productSelling, setProductSelling] = useState<string>("");
  const [prizeByUnit, setPrizeByUnit] = useState<string>("");
  const [prizeByDozen, setPrizeByDozen] = useState<string>("");
  const [prizeByCarton, setPrizeByCarton] = useState<string>("");
  const [storeKeepingUnit, setStoreKeepingUnit] = useState<string>("");
  const [barcode, setbarcode] = useState<string>("");
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [randomNumber, setRandomNumber] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    categories: "Choose a category",
    capitalPrice: "GNF 3410.99",
    sku: "P6516484",
    barcode: "5646546",
    photo: null,
    photoPreview: null,
  });

  const generateRandomNumber = () => {
    let number = "";
    for (let i = 0; i < 10; i++) {
      number += Math.floor(Math.random() * 10);
    }
    setRandomNumber(number);
  };

  const handleSelectedValue = (e: any) => {
    const value = e.target.value;
    setSelectedValue(value);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SIGNUP_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const addProductHandler = async () => {
    try {
      const responst = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/item/additem`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: productName,
            prize: Number(productSelling),
            sold_by: selectedOption,
            img_url: formData.photoPreview,
            category: selectedValue,
            price_per_unit: Number(prizeByUnit),
            price_per_dozen: Number(prizeByDozen),
            price_per_carton: Number(prizeByCarton),
            sku: Number(storeKeepingUnit),
            barcode: randomNumber,
          }),
        }
      );
      const res = await responst.json();
      console.log(res);
      if (!res) {
        return;
      }
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      photo: file,
      photoPreview: file ? URL.createObjectURL(file) : null,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <div className="product-page">
      <NavigationHeader
        title="Add a product"
        titleClassName="navigation-header-addproduct"
        NavigationHeaderImage={backIcon}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={() => navigate(-1)}
      />

      <main className="main-content">
        <h2 className="section-title">Product details</h2>

        <TextInput
          className="product-page-input"
          type="text"
          labelTitle="Product name"
          placeholder="Enter product name"
          value={productName}
          onChange={(e: any) => setProductName(e.target.value)}
        />

        <TextInput
          className="product-page-input1"
          type="number"
          labelTitle="Selling price"
          placeholder="Enter selling price"
          value={productSelling}
          onChange={(e: any) => setProductSelling(e.target.value)}
        />

        <div className="price-type-toggle">
          <span className="toggle-label">Add a price type</span>
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={isActive ? "toggle-switch" : "toggle-switch1"}
          >
            <div className="toggle-button" />
          </div>
        </div>

        <section className="add-product-section-radio">
          {["Unit", "Dozen", "Carton"].map((option, index) => (
            <div className="radio-btn" key={index}>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleChange}
              />
              <label>{option}</label>
            </div>
          ))}
        </section>

        <h2 className="section-title">More details (optional)</h2>
        <div className="photo-upload">
          <img
            src={
              formData.photoPreview ||
              "https://cdn.builder.io/api/v1/image/assets/TEMP/4bb6243af55186b1cd1ebac4b200eeb8a7c4b4063d03380c52d037ffbcc583ca?apiKey=d03ff6b018f84c75b88104249d2053b6&"
            }
            alt=""
            className="upload-preview"
          />
          <label className="upload-button">
            Choose a photo
            <input
              type="file"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div className="add-product-categories">
          <label htmlFor="add">categories</label>
          <select
            id="add"
            value={selectedValue}
            onChange={handleSelectedValue}
            className="add-product-select"
          >
            {categories.map((e, i) => {
              return (
                <option
                  key={i}
                  value={e["category_name"]}
                  onChange={handleSelectedValue}
                >
                  {e["category_name"]}
                </option>
              );
            })}
          </select>
        </div>

        <TextInput
          className="product-page-input3"
          type="number"
          labelTitle="Price per unit"
          placeholder="Enter price per unit"
          value={prizeByUnit}
          onChange={(e: any) => setPrizeByUnit(e.target.value)}
        />
        <TextInput
          className="product-page-input3"
          type="number"
          labelTitle="Price per dozen"
          placeholder="Enter price per dozen"
          value={prizeByDozen}
          onChange={(e: any) => setPrizeByDozen(e.target.value)}
        />
        <TextInput
          className="product-page-input3"
          type="number"
          labelTitle="Price per carton"
          placeholder="Enter price per carton"
          value={prizeByCarton}
          onChange={(e: any) => setPrizeByCarton(e.target.value)}
        />

        <TextInput
          className="product-page-input4"
          type="text"
          labelTitle="Stock Keeping Unit"
          placeholder="Enter stock unit"
          value={storeKeepingUnit}
          onChange={(e: any) => setStoreKeepingUnit(e.target.value)}
        />
        <h2 className="product-page-codebare">Code barre</h2>
        <div className="barcode-input">
          <input
            type="text"
            value={barcode || randomNumber}
            className="barcode-field"
            onChange={(e) => setbarcode(e.target.value)}
            name="barcode"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f49ceca8a5b8e0204a40b092222334f26b4eb227e997bea917064965e02deaf3?apiKey=d03ff6b018f84c75b88104249d2053b6&"
            alt="Scan barcode"
            className="barcode-icon"
            onClick={() => generateRandomNumber()}
          />
        </div>
        <button
          className={
            (productName &&
              productSelling &&
              categories &&
              barcode &&
              selectedOption) ||
            (productName &&
              productSelling &&
              categories &&
              randomNumber &&
              selectedOption)
              ? "add-product-button"
              : "add-product-button1"
          }
          onClick={addProductHandler}
        >
          Add a new product
        </button>
        <button
          className="delete-product-button"
          onClick={() => navigate("/cart")}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/302717b4ee4ab7d3462fc8605ada0ceaae8d5d7fbbd06287efa863058454024d?apiKey=d03ff6b018f84c75b88104249d2053b6&"
            alt=""
            className="delete-icon"
          />
          <span>Delete product</span>
        </button>
      </main>
    </div>
  );
};
