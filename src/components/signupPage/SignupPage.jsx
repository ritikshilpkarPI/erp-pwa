import React, { useState } from "react";
import "./SignupPage.css";

import NavigationHeader from "../navigationHeader/NavigationHeader";
import backButtonImage from "../../image/BackButton.svg";
import ButtonInput from "../buttonInput/ButtonInput";
import TextInput from "../textInput/TextInput";

import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const backFunc = () => {
    navigate(-1);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
  

  const signupHandle = async () => {
    try {
      // Trim the inputs
      const usernameTrimmed = username.trim();
      const emailTrimmed = newEmail.trim();
      const passwordTrimmed = newPassword.trim();

      // Check if any field is empty after trimming
      if (!usernameTrimmed || !emailTrimmed || !passwordTrimmed) {
        enqueueSnackbar("Please fill all the fields", { variant: "error" });
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: usernameTrimmed,
            email: emailTrimmed,
            password: passwordTrimmed,
          }),
        }
      );

      const result = await response.json();

      setLoading(false);

      if (result?.error) {
        enqueueSnackbar(result.error?.message, { variant: "error" });
      }
      if (result.token) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const signupHandler = throttle(signupHandle, 5000);

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
          <div>
            <p>
              <span>Already have an account?</span>
              <Link to="/login" className="signup-login-link">
                Login
              </Link>
            </p>
          </div>
          <ButtonInput
            type="submit"
            className="signup-submit-button-input"
            title="Sign up"
            onClick={() => {
              signupHandler();
            }}
            isLoading={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
