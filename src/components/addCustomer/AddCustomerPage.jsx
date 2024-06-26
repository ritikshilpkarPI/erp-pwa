import React, { useState } from "react";
import "./AddCustomerPage.css";
import TextInput from "../textInput/TextInput";
import TextArea from "../textArea/TextArea";
import ButtonInput from "../buttonInput/ButtonInput";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";

const AddCustomerPage = () => {
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({email});
    handleBlur()
  }
  const backFunc = () => {
    navigate(-1);
  };

  const handleBlur = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValid(emailPattern.test(email));
  };

  return (
    <div className="add-customer-page">
      <div className="add-customer-navbar">
        <NavigationHeader
          title="Add Customer"
          titleClassName="navigation-header-add-customer"
          NavigationHeaderImage={backIconImage}
          NavigationHeaderImageClassName="back-button-image-icon"
          onClick={backFunc}
        />
      </div>
      <form onSubmit={submitHandler}>
        <TextInput
          className="login-user-id-input"
          type="text"
          labelTitle="Name"
          placeholder="Enter your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          className="login-user-telephone-input"
          type="tel"
          labelTitle="Telephone"
          placeholder="Enter your Phone Number"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <TextInput
          className={`login-user-email-input`}
          type="email"
          labelTitle="Email"
          placeholder="Email or Phone Number"
          value={email}
          onblur={handleBlur}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextArea
          className="login-user-id-input-area"
          type="text"
          placeholder="Enter your desc"
          labelTitle="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <ButtonInput
          disable={username && telephone && email && address && isValid ? false : true}
          type="submit"
          className={
            username && telephone && email && address && isValid
              ? "login-submit-button-input"
              : "login-submit-button-input-def"
          }
          title="Submit"
          onClick={() => navigate("/cart")}
        />
      </form>
    </div>
  );
};

export default AddCustomerPage;
