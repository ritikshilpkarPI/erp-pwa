  import React, { useState } from "react";
import "./AddCustomerPage.css";
import TextInput from "../textInput/TextInput";
import TextArea from "../textArea/TextArea";
import ButtonInput from "../buttonInput/ButtonInput";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backIconImage from "../../image/BackIcon.svg";
import { useContext } from "react"; 
import { AppStateContext } from "../../appState/appStateContext"; 

const AddCustomerPage = () => {
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [creditLimit, setCreditLimit] = useState()
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);

  // Accessing global state and dispatch function from context
  const { dispatch } = useContext(AppStateContext);

  const randomId=(length) =>{
    return Math.random().toString(36).substring(2, length+2);
  };

  

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          address: address,
          id_number: randomId(8), 
          credit_limit: 677, 
          telephone: telephone,
          is_deleted:false
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'ADD_CUSTOMER', payload: data });
        navigate("/customers"); 
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

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
          onBlur={handleBlur} 
          onChange={(e) => setEmail(e.target.value)}
        />
         <TextInput
          className={`login-user-credit-limit-input`}
          type="Credit limit"
          labelTitle="Credit limit"
          placeholder="Credit limit"
          value={creditLimit}
          onBlur={handleBlur} 
          onChange={(e) => setCreditLimit(e.target.value)}
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
          disabled={!username || !telephone || !email || !address|| creditLimit || !isValid} 
          type="submit"
          className={
            username && telephone && email && address && isValid && creditLimit
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
