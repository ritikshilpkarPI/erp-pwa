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
      // Ensure input is valid
      if (!validateInput(input)) {
        return;
      }

      // Send POST request to backend endpoint for OTP generation
      const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/generate-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: input }), // Send 'email' instead of 'input'
      });

      // Parse response
      const data = await response.json();

      // Check if OTP sent successfully
      if (response.ok && data.message === "OTP sent successfully") {
        // Navigate to OTP verification page, passing email data
        navigate("/otpverification", { state: { email: input } });
      } else {
        throw new Error(data.message || "OTP sending failed");
      }
    } catch (error) {
      // Handle errors
      setIsValid(false);
      setValidationMessage(error.message || "Error sending OTP. Please try again.");
    }
  };

  const handleButtonClick = () => {
    // Validate input and send OTP if valid
    if (validateInput(input)) {
      sendOtp();
    }
  };

  // Disable button if input is empty
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
          We have sent you a <strong>One Time Password</strong> on this email address.
        </div>
        <div className="email-input">
          <TextInput
            className="email-verfication-input"
            type="text" // Use "text" type for generic input, not "email"
            labelTitle=""
            placeholder="Enter your email or phone number"
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
