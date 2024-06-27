import React, { useState } from "react";
import "./SignupPage.css";

import NavigationHeader from "../navigationHeader/NavigationHeader";
import backButtonImage from "../../image/BackButton.svg";
import ButtonInput from "../buttonInput/ButtonInput";
import TextInput from "../textInput/TextInput";

import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const backFunc = () => {
    navigate(-1);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const signupHandler = async () => {
    try {
      const responst = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: newEmail,
          password: newPassword,
        }),
      });

      const result = await responst.json();
      if (result.token) {
        navigate("/login");
      }
    } catch (error) {}
  };

  return (
    <div className="signup-page-container">
      <NavigationHeader
        title="Sign up"
        titleClassName="navigation-header-signup"
        NavigationHeaderImage={backButtonImage}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={backFunc}
      />

      <div className="signup-form-container">
        <form action="/signup" onSubmit={submitHandler} className="signup-form">
          <TextInput
            className="signup-user-email-input"
            type="text"
            labelTitle="Name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInput
            className="signup-user-phone-number-input"
            type="email"
            labelTitle="Email"
            placeholder="Enter your email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          <TextInput
            className="signup-user-password-input"
            type="password"
            labelTitle="Password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <ButtonInput
            type="submit"
            className="signup-submit-button-input"
            title="Submit"
            onClick={() => {
              signupHandler();
              // navigate("/cart")
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
