import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import TextInput from "../textInput/TextInput";
import ButtonInput from "../buttonInput/ButtonInput";
import backbtnsvg from "../../image/BackButton.svg";
import "./EmailVerification.css";

const EmailVerification = () => {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();

  const backFunc = () => {
    navigate("/signup");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setIsValid(true);
    setValidationMessage("");
  };

  const validateInput = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!isNaN(input)) {
      if (phoneRegex.test(input)) {
        setIsValid(true);
        setValidationMessage("");
        return true;
      } else {
        setIsValid(false);
        setValidationMessage("Please enter a valid 10-digit phone number");
        return false;
      }
    } else {
      if (emailRegex.test(input)) {
        setIsValid(true);
        setValidationMessage("");
        return true;
      } else {
        setIsValid(false);
        setValidationMessage("Please enter a valid email address");
        return false;
      }
    }
  };

  const sendOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/generate-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input }),
        }
      );

      const data = await response.json();
      if (response.ok && data.message === "OTP sent successfully") {
        navigate("/otpverification", { state: { email: data.email } });
      } else {
        throw new Error(data.message || "OTP sending failed");
      }
    } catch (error) {
      setIsValid(false);
      setValidationMessage(
        error.message || "Error sending OTP. Please try again."
      );
    }
  };

  const handleButtonClick = () => {
    if (validateInput(input)) {
      sendOtp();
    }
  };

 
  const disabled = input === "";

  return (
    <div className="email-verification">
      <NavigationHeader
        title="Verification"
        titleClassName="navigation-header-email"
        NavigationHeaderImage={backbtnsvg}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={backFunc}
      />
      <div className="email-verification-main">
        <div className="email-title">Verify your Email </div>
        <div className="email-description">
          We have sent you a <strong>One Time Password</strong> on this email
          address.
        </div>
        <div className="email-input">
          <TextInput
            className="email-verfication-input"
            type= "email"
            labelTitle=""
            placeholder="Enter your email "
            value={input}
            onChange={handleInputChange}
          />
        </div>
        {!isValid && (
          <div className="validation-message">{validationMessage}</div>
        )}
        <div className="email-verification-login">
          Already have an account? <Link to={"/login"}>Login</Link>
        </div>
      </div>

      <div className="email-verification-bottom-nav">
        <ButtonInput
          className={`email-verification-bottom-btn ${
            disabled ? "button-disabled" : ""
          }`}
          title="Get OTP"
          disable={disabled}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default EmailVerification;
