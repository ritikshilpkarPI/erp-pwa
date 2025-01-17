import React, { useState, useContext } from "react";
import "./AddCustomerPage.css";
import TextInput from "../textInput/TextInput";
import TextArea from "../textArea/TextArea";
import ButtonInput from "../buttonInput/ButtonInput";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";
import { AppStateContext } from "../../appState/appStateContext";
import getValidNumberWithoutExpo from "../../utils/getValidNumberWithoutExpo";
import isPhoneNumberValid from "../../utils/isPhoneNumberValid";

const AddCustomerPage = () => {
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isValidTelephoneNumber = isPhoneNumberValid(telephone);
  const trimmedUsername = username?.trim();

  const { dispatch } = useContext(AppStateContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true)

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({
            name: username.replace(/^\s+/, ""),
            address: address.replace(/^\s+/, ""),
            email: email.replace(/^\s+/, ""),
            credit_limit: parseFloat(creditLimit.replace(/^\s+/, "")),
            telephone: telephone.replace(/^\s+/, ""),
            is_deleted: false,
          }),
          credentials: "include"
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: "ADD_CUSTOMER", payload: data });
        navigate("/customers");
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    finally{
      setIsLoading(false)
    }
  };

  const backFunc = () => {
    navigate(-1);
  };

  const handleBlur = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailPattern.test(email.replace(/^\s+/, "")));
  };

  return (
    <div className="add-customer-page">
      <NavigationHeader
        title="Add Customer"
        titleClassName="navigation-header-add-customer"
        NavigationHeaderImage={backIconImage}
        NavigationHeaderImageClassName="back-button-image-icon"
        onClick={backFunc}
      />
      <form onSubmit={submitHandler} className="add-customer-form">
        <TextInput
          className="login-user-id-input"
          type="text"
          labelTitle="Name"
          placeholder="Enter Customer Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          className="login-user-telephone-input"
          type="number"
          labelTitle="Telephone"
          placeholder="Enter Customer Phone Number"
          value={telephone}
          onChange={(e) => setTelephone(getValidNumberWithoutExpo(e.target.value))}
          isPhoneNumber = 'true'
          min={0}
        />
        <TextInput
          className="login-user-email-input"
          type="email"
          labelTitle="Email"
          placeholder="Enter Customer email address"
          value={email}
          onBlur={handleBlur}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          className="login-user-credit-limit-input"
          type="number"
          labelTitle="Credit limit"
          placeholder="Enter credit limit"
          value={creditLimit}
          onChange={(e) => setCreditLimit(getValidNumberWithoutExpo(e.target.value))}
          min={0}
        />
        <TextArea
          className="login-user-id-input-area"
          type="text"
          placeholder="Enter Customer Address"
          labelTitle="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value.replace(/^\s+/, ""))}
        />

        <ButtonInput
          disabled={
            !username ||
            !telephone ||
            // !email ||
            // !address ||
            !creditLimit ||
            !isValidTelephoneNumber ||
            !trimmedUsername ||
            isLoading
            // !isEmailValid
          }
          type="submit"
          className={
            username?.trim() &&
            trimmedUsername &&
            // email &&
            // address &&
            isEmailValid
            // creditLimit
            ? "login-submit-button-input"
            : "login-submit-button-input-def"
          }
          title="Submit"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};

export default AddCustomerPage;
