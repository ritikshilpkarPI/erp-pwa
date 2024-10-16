import "./OtpVerification.css";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backbtnsvg from "../../image/BackButton.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ButtonInput from "../buttonInput/ButtonInput";

const OtpVerification = () => {
  const length = 4;
  const [otpInput, setOtpInput] = useState(new Array(length).fill(""));
  const [timeLeft, setTimeLeft] = useState(300);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);

  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const backFunc = () => {
    navigate("/emailverification");
  };

  const otpSubmit = async (otp) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email }), // Include email in the body
        }
      );

      const data = await response.json();
      if (response.ok && data.message === "OTP verified") {
        setSuccessMessage("OTP verified successfully");
        navigate("/changepassword", {
          state: { tempToken: data.tempToken, email: email },
        });
      } else {
        throw new Error(data.message || "OTP verification failed");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Error verifying OTP. Please try again."
      );
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otpInput];
    newOtp[index] = value.substring(value.length - 1);
    setOtpInput(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) otpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otpInput[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const resendOtp = async () => {
    inputRefs.current[0].focus();
    setResendDisabled(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Send email correctly
        }
      );

      const data = await response.json();
      if (response.ok && data.message === "OTP sent successfully") {
        setSuccessMessage("OTP resent successfully");
        setTimeLeft(300);
      } else {
        throw new Error(data.message || "OTP resending failed");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Error resending OTP. Please try again."
      );
    } finally {
      setTimeout(() => setResendDisabled(false), 60000); // disable resend for 1 minute
    }
  };

  const allFieldsFilled = otpInput.every((input) => input.trim() !== "");

  return (
    <div className="otp-verification">
      <NavigationHeader
        title="Verify OTP"
        titleClassName="navigation-header-otp-title"
        NavigationHeaderImage={backbtnsvg}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={backFunc}
      />
      <div className="otp-verification-main">
        <div className="otp-title">OTP Verification</div>
        <div className="otp-description">
          Enter the code from the Email we sent to{" "}
          <span style={{ fontWeight: 600 }}>{email}</span>
        </div>
        <div className="timer-element">
          {timeLeft > 0 ? formatTime(timeLeft) : "Time expired"}
        </div>
        <div className="otp-input-field">
          {otpInput.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              ref={(input) => (inputRefs.current[index] = input)}
              className="otp-input"
              onChange={(e) => handleInputChange(e, index)}
              onClick={() => handleInputClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <div className="message">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
        <div className="otp-footer">
          Didn't receive the OTP?{" "}
          <span
            onClick={resendOtp}
            className={resendDisabled ? "disabled" : ""}
            style={{ color: "blue", cursor: resendDisabled ? "not-allowed" : "pointer" }}
          >
            Resend
          </span>
        </div>
      </div>
      <div className="otp-verification-bottom-nav">
        <ButtonInput
          className={`otp-verification-bottom-btn ${
            allFieldsFilled ? "" : "button-disabled"
          }`}
          title="Submit"
          disable={!allFieldsFilled}
          onClick={() => otpSubmit(otpInput.join(""))}
        />
      </div>
    </div>
  );
};

export default OtpVerification;
