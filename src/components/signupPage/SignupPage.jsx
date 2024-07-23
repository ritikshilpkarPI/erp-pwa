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
  const [otp, setOtp] = useState("");
  const [otpRes, setOtpRes] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const verifyEmailHandler = async () => {
    try {
      const emailTrimmed = newEmail.trim();

      if (!emailTrimmed) {
        enqueueSnackbar("Please enter your email", { variant: "error" });
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailTrimmed,
          }),
        }
      );

      const result = await response.json();
      setOtpRes(result);
      console.log(result);
      setLoading(false);

      if (result?.error) {
        enqueueSnackbar(result.error?.message, { variant: "error" });
      } else {
        enqueueSnackbar("OTP sent to email", { variant: "success" });
        setIsOtpSent(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const signupHandle = async () => {
    try {
      const usernameTrimmed = username.trim();
      const emailTrimmed = newEmail.trim();
      const passwordTrimmed = newPassword.trim();
      const otpTrimmed = otp.trim();

      if (
        !usernameTrimmed ||
        !emailTrimmed ||
        !passwordTrimmed ||
        !otpTrimmed
      ) {
        enqueueSnackbar("Please fill all the fields and enter OTP", {
          variant: "error",
        });
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
      } else {
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
        title="Sign Up"
        titleClassName="navigation-header-signup"
        NavigationHeaderImage={backButtonImage}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={handleBackClick}
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
            className="signup-user-email-input"
            type="email"
            labelTitle="Email"
            placeholder="Enter your email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <h4 className="verify-email-button" onClick={verifyEmailHandler}>
            Verify Email
          </h4>

          <TextInput
            className="signup-user-password-input"
            type="password"
            labelTitle="Password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {isOtpSent && (
            <TextInput
              className="signup-user-otp-input"
              type="text"
              labelTitle="OTP"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}

          <div>
            <p>
              <span>Already have an account? {otpRes} </span>
              <Link to="/login" className="signup-login-link">
                Log In
              </Link>
            </p>
          </div>
          <ButtonInput
            type="submit"
            className="signup-submit-button-input"
            title="Sign Up"
            onClick={() => {
              otp == otpRes
                ? signupHandler()
                : enqueueSnackbar("Sorry Wrong password");
            }}
            isLoading={loading}
            disabled={!isOtpSent || !otp}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
