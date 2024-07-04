import "./OtpVerification.css";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import backbtnsvg from "../../image/BackButton.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ButtonInput from "../buttonInput/ButtonInput";

const OtpVerification = () => {
  const length = 4;
  const [otpInput, setOtpInput] = useState(new Array(length).fill(""));
  const [timeLeft, setTimeLeft] = useState(120); 

  const navigate = useNavigate();

  const backFunc = () => {
    navigate("/emailverification");
  };

  const otpSubmit = (otp) => {
    console.log(otp);
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

  const inputRefs = useRef([]);

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
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
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
          Enter the code from the Email we sent to dummy@gmail.com
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
        <div className="otp-footer">
          Don't receive the OTP? <span>Resend</span> 
        </div>
        
      </div>
      <div className="otp-verification-bottom-nav">
        <ButtonInput
          className={`otp-verification-bottom-btn ${allFieldsFilled ? "" : "button-disabled"}`}
          title="Submit"
          disable={!allFieldsFilled}
          onClick={() => navigate("/changepassword")}
        />
      </div>
    </div>
  );
};

export default OtpVerification;
