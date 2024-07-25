import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIcon from "../../image/BackIcon.svg";
import TextInput from "../textInput/TextInput";
import "../addProduct/AddProduct.css";
import { enqueueSnackbar } from "notistack";
import ButtonInput from "../buttonInput/ButtonInput";

interface FormData {
  categories: string;
  capitalPrice: string;
  sku: string;
  barcode: string;
  photo: File | null;
  photoPreview: string | null;
}

export const AddProduct = () => {
  const [productName, setProductName] = useState<string>("");
  const [productSelling, setProductSelling] = useState<string>("");
  const [prizeByUnit, setPrizeByUnit] = useState<string>("");
  const [prizeByDozen, setPrizeByDozen] = useState<string>("");
  const [prizeByCarton, setPrizeByCarton] = useState<string>("");
  const [storeKeepingUnit, setStoreKeepingUnit] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [randomNumber, setRandomNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const addProductHandler = async (e: any) => {
    e.preventDefault();
    if (!formData.photo) {
      alert("Please select a file first!");
      return;
    }

    setIsLoading(true);

    try {
      const formDataa = new FormData();
      formDataa.append("name", productName);
      formDataa.append("prize", productSelling);
      formDataa.append("img_url", formData.photo);
      formDataa.append("category", selectedValue);
      formDataa.append("price_per_unit", prizeByUnit);
      formDataa.append("price_per_dozen", prizeByDozen);
      formDataa.append("price_per_carton", prizeByCarton);
      formDataa.append("sku", storeKeepingUnit);
      formDataa.append("barcode", randomNumber);

      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/item/additem`,
        {
          method: "POST",
          body: formDataa,
        }
      );
      const res = await response.json();

      setIsLoading(false);

      if (!res) {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      } else {
        navigate("/landing");
        enqueueSnackbar("Add Product Successfully", { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Something went wrong", { variant: "error" });
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

      <form onSubmit={addProductHandler}>
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
              onChange={(e) => setBarcode(e.target.value)}
              name="barcode"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f49ceca8a5b8e0204a40b092222334f26b4eb227e997bea917064965e02deaf3?apiKey=d03ff6b018f84c75b88104249d2053b6&"
              alt="Scan barcode"
              className="barcode-icon"
              onClick={() => generateRandomNumber()}
            />
          </div>

          <ButtonInput
            type="submit"
            className={
              productName && productSelling && selectedValue && (barcode || randomNumber)
                ? "add-product-button"
                : "add-product-button1"
            }
            title="Add a new product"
            disabled={
              !productName || !productSelling || !selectedValue || !(barcode || randomNumber)
            }
            isLoading={isLoading}
          />

          <button
            className="delete-product-button"
            onClick={() => navigate("/landing")}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/302717b4ee4ab7d3462fc8605ada0ceaae8d5d7fbbd06287efa863058454024d?apiKey=d03ff6b018f84c75b88104249d2053b6&"
              alt=""
              className="delete-icon"
            />
            <span>Delete product</span>
          </button>
        </main>
      </form>
    </div>
  );
};
