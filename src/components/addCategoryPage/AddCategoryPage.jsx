import React, { useState } from "react";
import "./AddCategoryPage.css";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import { useNavigate } from "react-router-dom";
import backIconImage from "../../image/BackIcon.svg";
import TextInput from "../textInput/TextInput";
import ButtonInput from "../buttonInput/ButtonInput";

const AddCategoryPage = () => {
  const navigate = useNavigate();

  const [addCategory, setAddCategory] = useState("");
  const [addColor, setAddColor] = useState("");
  const [addImage, setAddImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("category_name", addCategory);
      formData.append("category_color", addColor);
      formData.append("category_image", addImage);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`,
        {
          method: "POST",
          body: formData,
          credentials: "include"
        }
      );

      if (response.ok) {
        console.log("data submitted")
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
      navigate('/category')


    }
  };

  const isFormFilled = addCategory !== "" && addColor !== "";

  return (
    <div className="add-category-page-container">
      <NavigationHeader
        title="Add Category"
        titleClassName="navigation-header-add-category"
        NavigationHeaderImage={backIconImage}
        NavigationHeaderImageClassName="back-button-image-icon"
        onClick={() => navigate(-1)}
      />
      <form className="add-category-form" onSubmit={handleSubmit}>
        <TextInput
          className="category-name-input"
          type="text"
          labelTitle="Enter new category"
          placeholder="Enter new category"
          value={addCategory}
          onChange={(e) => setAddCategory(e.target.value)}
        />
        <TextInput
          className="category-color-input"
          type="color"
          labelTitle="Select category color"
          placeholder="Select category color"
          value={addColor}
          onChange={(e) => setAddColor(e.target.value)}
        />
        <TextInput
          className="category-image-input"
          type="file"
          labelTitle="Select category image"
          placeholder="Select category image"
          onChange={(e) => setAddImage(e.target.files[0])}
          accept="image/png, image/jpeg"
        />
        <ButtonInput
          disabled={!isFormFilled || isLoading}
          type="submit"
          title="Submit"
          className={isFormFilled ? "category-submit-button-input" : "category-submit-button-input-def"}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};

export default AddCategoryPage;
