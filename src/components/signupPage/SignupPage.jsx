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

  const signupHandler = async () => {
    try {


      if (!username || !newEmail || !newPassword) {
        enqueueSnackbar("Please fill all the fields", { variant: "error" });
        return;
      }    

      setLoading(true); 

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
              <span>
                Already have an account?
              </span>
              <Link to="/login" className="signup-login-link">
                 Login
              </Link>
            </p>
          </div>
          <ButtonInput
            type="submit"
            className="signup-submit-button-input"
            title="Submit"
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
