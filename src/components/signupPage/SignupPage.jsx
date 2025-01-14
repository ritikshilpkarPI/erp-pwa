import React, { useState, useEffect } from "react";
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
  const [newPhone, setnewPhone] = useState("");
  const [countryCode, setCountryCode] = useState('+91')
  const [newBussinessName, setnewBussinessName] = useState("");
  const [newAddress, setnewAddress] = useState("");

  const [otp, setOtp] = useState("");
  const [otpRes, setOtpRes] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    let interval;
    if (timer !== null) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendEnabled(true);
            setTimer(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyEmail = () => {
    verifyEmail();
    setTimeLeft(60);
    setTimer(true);
    setIsResendEnabled(false);
  };

  const handleResendOTP = () => {
    verifyEmail();
    setTimeLeft(60);
    setTimer(true);
    setIsResendEnabled(false);
  };

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

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/send-otp`,
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

      if (result?.error) {
        enqueueSnackbar(result.error?.message, { variant: "error" });
      } else {
        enqueueSnackbar("OTP sent to email", { variant: "success" });
        setIsOtpSent(true);
      }
    } catch (error) {
      console.log(error);

      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const signupHandle = async () => {
    try {
      const usernameTrimmed = username.trim();
      const emailTrimmed = newEmail.trim();
      const passwordTrimmed = newPassword.trim();
      const otpTrimmed = otp.trim();
      const phoneTrimmed = newPhone.trim();
      const bussinessnameTrimmed = newBussinessName.trim();
      const addressTrimmed = newAddress.trim();

      if (
        !usernameTrimmed ||
        !emailTrimmed ||
        !passwordTrimmed ||
        !otpTrimmed ||
        !phoneTrimmed ||
        !bussinessnameTrimmed ||
        !addressTrimmed
      ) {
        enqueueSnackbar("Please fill all the fields and enter OTP", {
          variant: "error",
        });
        return;
      }

      if (!validatePassword()) {
        return;
      }

      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: usernameTrimmed,
          email: emailTrimmed,
          password: passwordTrimmed,
          phone_number: `${countryCode}${phoneTrimmed}`,
          business_name: bussinessnameTrimmed,
          address: addressTrimmed,
        }),
      });

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
  const verifyEmail = throttle(verifyEmailHandler, 10000);

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setnewPhone(input);
    }
  };

  const validatePassword = () => {
    if (newPassword.length < 6) {
      setValidationMessage("Password must be at least 6 characters long");
      return false;
    }
    setValidationMessage("");
    return true;
  };

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
          <div className="signup-number-container">
            <label className="number-input-label" htmlFor="number-input">
              Phone Number
            </label>
            <div className="number-input-container">
              <select
                className="number-country-code"
                id="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+91">IND</option>
                <option value="+94">LKA</option>
              </select>
              <input
                className="number-input"
                type="number"
                placeholder="Enter your number"
                value={newPhone}
                onChange={(e) => handlePhoneNumberChange(e)}
                onKeyDown={(e)=> ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                maxLength={10}
              />
            </div>
          </div>
          <TextInput
            className="signup-user-bussiness-name-input"
            type="text"
            labelTitle="Bussiness Name"
            placeholder="Enter your bussiness name"
            value={newBussinessName}
            onChange={(e) => setnewBussinessName(e.target.value)}
          />
          <TextInput
            className="signup-user-address-input"
            type="text"
            labelTitle="Bussiness Address"
            placeholder="Enter your Address"
            value={newAddress}
            onChange={(e) => setnewAddress(e.target.value)}
          />
          <TextInput
            className="signup-user-email-input"
            type="email"
            labelTitle="Email"
            placeholder="Enter your email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <div className="verify-email-button-outer">
            {otpRes && newEmail && isOtpSent ? (
              <h4 className="verify-email-button">
                {isResendEnabled ? (
                  <span onClick={handleResendOTP}>Resend OTP</span>
                ) : (
                  `Resend OTP in ${timeLeft}s`
                )}
              </h4>
            ) : (
              <h4 className="verify-email-button" onClick={handleVerifyEmail}>
                Verify Email
              </h4>
            )}
          </div>
          {isOtpSent && (
            <TextInput
              className="signup-user-otp-input"
              type="number"
              labelTitle="OTP"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              isOtp={true}
            />
          )}
          <TextInput
            className="signup-user-password-input"
            type="password"
            labelTitle="Password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {validationMessage && (
            <div className="validation-message">{validationMessage}</div>
          )}

          <ButtonInput
            type="submit"
            className="signup-submit-button-input"
            title="Sign Up"
            onClick={() => {
              parseInt(otp) === otpRes
                ? signupHandler()
                : enqueueSnackbar("Fill the correct OTP", { variant: "error" });
            }}
            isLoading={loading}
            disabled={
              !isOtpSent || !otp || !username || !newEmail || !newPassword
            }
          />
          <div>
            <p>
              <span>Already have an account? </span>
              <Link to="/login" className="signup-login-link">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
