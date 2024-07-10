import React, { useState, useContext } from "react";
import "./AddCustomerPage.css";
import TextInput from "../textInput/TextInput";
import TextArea from "../textArea/TextArea";
import ButtonInput from "../buttonInput/ButtonInput";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";
import { AppStateContext } from "../../appState/appStateContext";

const AddCustomerPage = () => {
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

  const { dispatch } = useContext(AppStateContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username.replace(/^\s+/, ""),
            address: address.replace(/^\s+/, ""),
            credit_limit: parseFloat(creditLimit.replace(/^\s+/, "")),
            telephone: telephone.replace(/^\s+/, ""),
            is_deleted: false,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "ADD_CUSTOMER", payload: data });
        navigate("/customers");
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
          placeholder="Enter your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value.replace(/^\s+/, ""))}
        />
        <TextInput
          className="login-user-telephone-input"
          type="tel"
          labelTitle="Telephone"
          placeholder="Enter your Phone Number"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value.replace(/^\s+/, ""))}
        />
        <TextInput
          className="login-user-email-input"
          type="email"
          labelTitle="Email"
          placeholder="Enter your email address"
          value={email}
          onBlur={handleBlur}
          onChange={(e) => setEmail(e.target.value.replace(/^\s+/, ""))}
        />
        <TextInput
          className="login-user-credit-limit-input"
          type="number"
          labelTitle="Credit limit"
          placeholder="Enter credit limit"
          value={creditLimit}
          onChange={(e) => setCreditLimit(e.target.value.replace(/^\s+/, ""))}
        />
        <TextArea
          className="login-user-id-input-area"
          type="text"
          placeholder="Enter your Address"
          labelTitle="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value.replace(/^\s+/, ""))}
        />

        <ButtonInput
          disabled={
            !username ||
            !telephone ||
            !email ||
            !address ||
            !creditLimit ||
            !isEmailValid
          }
          type="submit"
          className={
            username && telephone && email && address && isEmailValid && creditLimit
              ? "login-submit-button-input"
              : "login-submit-button-input-def"
          }
          title="Submit"
        />
      </form>
    </div>
  );
};

export default AddCustomerPage;
